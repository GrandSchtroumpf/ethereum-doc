import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractService } from './../../services/contract';
import { AddressesComponent } from './../addresses/addresses.component';
import { ABIDefinition } from './../../models/compiler';
import { ContractStore } from './../../+state/contract.store';
import { ContractQuery } from './../../+state/contract.query';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractDoc } from '../../models/doc';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, filter, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'contract-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  private alive = true;
  public contract$: Observable<ContractDoc>;
  public code: string;
  public showAbi: boolean;

  constructor(
    private store: ContractStore,
    private query: ContractQuery,
    private service: ContractService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

  public save(doc: ContractDoc) {
    const ref = this.dialog.open(AddressesComponent, {width: '80%', data: doc.addresses});
    ref.afterClosed().pipe(
      filter(addresses => !!addresses),
      switchMap(addresses => this.service.save({ ...doc, addresses }))
    ).subscribe(
      () => this.snackBar.open('Documentation saved', 'close', { duration: 2000 }),
      (err) => {
        console.error(err);
        this.snackBar.open('Could not save the doc', 'close', { duration: 2000 });
      }
    );
  }

}
