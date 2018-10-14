import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractQuery } from '../../+state/contract.query';
import { ContractDoc, ABIDefinition } from './../../+state/contract.model';
import { ContractStore } from './../../+state/contract.store';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  private alive = true;
  public contract$: Observable<ContractDoc>;
  public code: string;

  constructor(
    private query: ContractQuery,
    private store: ContractStore,
    private route: ActivatedRoute,
    private scroll: ViewportScroller
  ) { }

  ngOnInit() {
    this.contract$ = this.query.activeContract$;
    this.route.params.pipe(
      takeWhile(() => this.alive),
    ).subscribe(param => {
      this.updateCode(param.name);
      this.store.setActive(param.name);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public scrollTo(anchor: string) {
    this.scroll.scrollToAnchor(anchor);
  }

  public updateCode(name: string, abi?: ABIDefinition[], bytecode?: string) {
    const abiString = abi ? `const abi = ${JSON.stringify(abi)};` : 'const abi = [];      // Here goes the ABI of the contract';
    const byteString = abi ? `const bytecode = '${bytecode}';` : 'const bytecode = ""; // Here goes the bytecode of the contract';
    this.code = `const ethers = require('ethers');

const provider = ethers.getDefaultProvider('default');
${abiString}
${byteString}
const ${name}Contract = new ethers.Contract(contractAddress, abi, provider);
    `;
  }

}
