import { Injectable } from '@angular/core';
import { Remix } from './remix';
import { ContractStore } from './../+state/contract.store';

import { map, filter, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContractService {

  constructor(
    private store: ContractStore,
    private remix: Remix
  ) {
    this.remix.compilationResult$.pipe(
      tap(result => {
        if (!result.data) { this.remix.request('compiler', 'getCompilationResult'); }
      }),
      filter(result => !!result.data),
      map(result => result.data.contracts),
    ).subscribe(contracts => {
      for (const target in contracts) {
        const name = Object.keys(contracts[target])[0];
        this.store.createOrReplace(name, contracts[target][name]);
      }
    });
  }

}
