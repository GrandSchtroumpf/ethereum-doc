import { Component, OnInit } from '@angular/core';
import { ContractQuery } from '../../+state/contract.query';
import { ContractDoc } from '../../+state/contract.model';
import { Observable } from 'rxjs';
import { ContractService } from 'src/app/services/contract';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public contracts$: Observable<ContractDoc[]>;

  constructor(
    private query: ContractQuery
  ) { }

  ngOnInit() {
    this.contracts$ = this.query.contracts$;
  }

}
