import { Component, OnInit } from "@angular/core";
import { ContractService } from "./+state/contract.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
  styles: [`
  :host {
    display: block;
    height: 100%;
    background-color:rgb(250, 250, 250);
    overflow: hidden;
  }`]
})
export class AppComponent implements OnInit {
  constructor(private service: ContractService) {}

  ngOnInit() {
    this.service.load();
  }
}
