import { Injectable } from '@angular/core';
import { Remix } from './remix';
import { Contract } from './../models/compiler';
import { ContractDoc } from './../models/doc';
import { ContractStore } from './../+state/contract.store';

import { Observable, Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContractService {

  constructor(
    private store: ContractStore,
    private remix: Remix
  ) {
    this.remix.compilationResult$.pipe(
      map(result => result.data.contracts),
    ).subscribe(contracts => {
      for (const target in contracts) {
        const name = Object.keys(contracts[target])[0];
        this.store.createOrReplace(name, contracts[target][name]);
      }
    });
  }

}
