import { Component, OnInit } from "@angular/core";
import { ContractService } from "./+state/contract.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(private service: ContractService) {}

  ngOnInit() {
    this.service.load();
  }
}
