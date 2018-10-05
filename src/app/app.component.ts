import { Component, HostListener, OnInit } from '@angular/core';
import { Remix } from './services/remix';
import { ContractService } from './services/contract';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [`
  :host {
    display: block;
    height: 100%;
    background-color:rgb(250, 250, 250);
    overflow: hidden;
  }`]
})
export class AppComponent implements OnInit {

  constructor(private remix: Remix, private service: ContractService) {}

  @HostListener('window:message', ['$event'])
  onMessage(e: MessageEvent) {
    this.remix.getMsg(e);
  }

  ngOnInit() {
    this.remix.request('compiler', 'getCompilationResult');
  }
}
