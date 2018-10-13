import { ContractQuery } from './../+state/contract.query';
import { Injectable } from '@angular/core';
import { Remix } from './remix';
import { ContractStore } from './../+state/contract.store';
import { ContractDoc } from './../models/doc';

import { filter, tap, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Auth } from './auth';

@Injectable({ providedIn: 'root' })
export class ContractService {

  constructor(
    private store: ContractStore,
    private db: AngularFirestore,
    private auth: Auth,
    private remix: Remix
  ) {
    this.remix.compilationResult$.pipe(
      tap(result => {
        if (!result.data) { this.remix.request('compiler', 'getCompilationResult'); }
      }),
      filter(result => !!result.data),
    ).subscribe(result => {
      const contracts = result.data.contracts;
      const sources = result.source.sources;
      for (const target in contracts) {
        const name = Object.keys(contracts[target])[0];
        this.store.createOrReplace(name, {
          ...contracts[target][name],
          code: sources[target].content
        });
      }
    });
  }

  /** Angular firestore save  */
  public save(doc: ContractDoc) {
    return this.auth.user$.pipe(
      tap(user => !user ? this.auth.loginAlert() : true),
      filter(user => !!user),
      switchMap(({ uid }) => {
        return this.db
          .collection('contracts')
          .doc(doc.name)
          .set({ ...doc, owner: uid });
      })
    );
  }

}
