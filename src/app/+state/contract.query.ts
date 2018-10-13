import { Injectable } from '@angular/core';
import { Contract } from './../models/compiler';
import { ContractState, ContractStore } from './contract.store';
import { ContractDoc } from './../models/doc';

import { QueryEntity } from '@datorama/akita';
import { map, filter } from 'rxjs/operators';
​
@Injectable({ providedIn: 'root' })
export class ContractQuery extends QueryEntity<ContractState, Contract> {

  public contracts$ = this.selectAll();

  public activeContract$ = this.selectActive().pipe(
    filter(contract => !!contract),
    map(contract => this.getDoc(contract))
  );

  constructor(protected store: ContractStore) {
    super(store);
  }


  /** Get all documentation data for one method */
  private getDocForMethod({ inputs, outputs }, devdoc) {
    const params = devdoc.params || {};
    return {
      ...devdoc,
      params:  inputs.map(({name, type}) => ({ name, type, description: params[name] || '' })),
      return: { outputs, description: devdoc.return || '' }
    };
  }

  /**
   * Get the Documentation of a contract
   * @param contractName The name of the contract
   * @param contract The compiled contract to get the documentation from
   */
  private getDoc(contract: Contract): ContractDoc {
    const metadata = contract.metadata ? JSON.parse(contract.metadata) : {};
    const output = metadata.output;

    const abi = output ? output.abi : [];
    const { title, author } = output ? output.devdoc : { title: undefined, author: undefined };

    // Get doc from all methods
    const methods = abi.map(def => {
      const {name, payable, type, constant, stateMutability } = def;
      let methodDoc = {};
      // Get the method: need to use includes because method looks like that : "methodName(type param)" and not "methodName"
      for (const key in metadata.output.devdoc.methods) {
        if (key.includes(name)) {
          methodDoc = {
            ...metadata.output.devdoc.methods[key],
            ...metadata.output.userdoc.methods[key]
          };
        }
      }
      return { name, payable, type, constant, stateMutability, ...this.getDocForMethod(def, methodDoc) };
    });

    const result = {
      name: (<any>contract).id,
      code: contract.code,
      bytecode: contract.evm.bytecode.object,
      title,
      author,
      methods,
      abi
    };
    // Remove undefined fields
    Object.keys(result).forEach(key => result[key] === undefined ? delete result[key] : '');
    return result;
  }
}
