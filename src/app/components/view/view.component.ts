import { ContractStore } from './../../+state/contract.store';
import { ContractQuery } from './../../+state/contract.query';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractDoc } from '../../models/doc';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'contract-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  private alive = true;
  public contract$: Observable<ContractDoc>;
  public code: string;

  constructor(
    private store: ContractStore,
    private query: ContractQuery,
    private route: ActivatedRoute
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

  private updateCode(name: string) {
    let abi: string;
    /*
    if (this.showAbi && !!this.compiled) {
      abi = `
const abi = ${this.compiled.interface};
const bytecode = '${this.compiled.bytecode}';`;
    } else {
      */
      abi = `
const abi = [];      // Here goes the ABI of the contract
const bytecode = ''; // Here goes the bytecode of the contract`;
    // }
    this.code = `const ethers = require('ethers');

const provider = ethers.getDefaultProvider('default');
${abi}
const ${name}Contract = new ethers.Contract(contractAddress, abi, provider);
    `;
  }

}
