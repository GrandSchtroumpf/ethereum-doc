import { Injectable } from '@angular/core';
import { ContractStore } from './contract.store';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ContractService {

  constructor(
    private db: AngularFirestore,
    private store: ContractStore
  ) {}

}
