import { Injectable } from '@angular/core';
import { ContractDoc } from './contract.model';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';

export interface ContractState extends EntityState<ContractDoc> { }

const initialState = {
  ...getInitialActiveState()
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contracts', idKey: 'name' })
export class ContractStore extends EntityStore<ContractState, ContractDoc> {
  constructor() {
    super(initialState);
  }
}
