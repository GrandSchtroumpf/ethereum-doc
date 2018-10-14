import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ContractDoc } from './contract.model';
import { ContractState, ContractStore } from './contract.store';

import { QueryEntity } from '@datorama/akita';
​
@Injectable({ providedIn: 'root' })
export class ContractQuery extends QueryEntity<ContractState, ContractDoc> {

  public contracts$ = this.selectAll();

  public activeContract$ = this.selectActive<ContractDoc>();

  constructor(protected store: ContractStore) {
    super(store);
  }

}
