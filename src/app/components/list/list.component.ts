import { Contract } from './../../models/compiler';
import { ContractStore } from './../../+state/contract.store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractQuery } from '../../+state/contract.query';
import { ContractService } from '../../services/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public contracts$: Observable<Contract[]>;

  constructor(private router: Router, private query: ContractQuery) { }

  ngOnInit() {
    this.contracts$ = this.query.contracts$;
  }

  public select(name: string) {
    this.router.navigate(['/', name]);
  }

}
