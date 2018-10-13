import { Injectable } from '@angular/core';
import { ContractDoc } from './contract.model';
import { ContractState, ContractStore } from './contract.store';

import { QueryEntity } from '@datorama/akita';
import { map, filter } from 'rxjs/operators';
​
@Injectable({ providedIn: 'root' })
export class ContractQuery extends QueryEntity<ContractState, ContractDoc> {

  public contracts$ = this.selectAll();

  public activeContract$ = this.selectActive();

  constructor(protected store: ContractStore) {
    super(store);
  }

}
