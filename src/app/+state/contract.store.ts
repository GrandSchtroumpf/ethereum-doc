import { Injectable } from '@angular/core';
import { Contract } from './../models/compiler';
import { ContractDoc } from './../models/doc';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';

export interface ContractState extends EntityState<Contract> { }

const initialState = {
  ...getInitialActiveState()
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contracts' })
export class ContractStore extends EntityStore<ContractState, Contract> {
  constructor() {
    super(initialState);
  }
}
