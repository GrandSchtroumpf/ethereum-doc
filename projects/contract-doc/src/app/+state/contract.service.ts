import { Injectable } from '@angular/core';
import { ContractStore } from './contract.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContractDoc } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractService {

  constructor(
    private db: AngularFirestore,
    private store: ContractStore
  ) {}


  public load() {
    this.db.collection<ContractDoc>('contracts')
    .valueChanges()
    .subscribe(contracts => this.store.set(contracts));
  }
}
