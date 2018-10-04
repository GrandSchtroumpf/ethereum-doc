import { CompilationResult } from './../models/compiler';
import { RemixKey, RemixRequest, remixAction, RemixTypeRequest, RemixNotification, RemixResponse } from './../models/remix';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Remix {
  private remixUrl = [
    "http://remix-alpha.ethereum.org",
    "http://remix.ethereum.org",
    "https://remix-alpha.ethereum.org",
    "https://remix.ethereum.org"
  ];
  private source: Window;
  private msgId = 0;

  // Subjects
  private compilationResult = new Subject<CompilationResult>();
  private currentFileName = new Subject<string>();
  private currentFile = new Subject<string>();

  // Observables
  public compilationResult$ = this.compilationResult.asObservable();
  public currentFileName$ = this.currentFileName.asObservable();
  public currentFile$ = this.currentFile.asObservable();

  constructor() {
    this.source = window.parent;
  }

  /** Send the message to remix */
  private postMsg(message: RemixRequest) {
    const msg = JSON.stringify({ ...message, id: this.msgId });
    this.source.postMessage(msg, "*");
  }

  /** Dispatch the message between notifs and response */
  private dispatchMsg(msg: RemixNotification | RemixResponse) {
    msg.action === remixAction.notif ? this.getNotif(msg) : this.getResponse(msg);
  }

  /** Get a notification */
  private getNotif(msg: RemixNotification) {
    // To something
  }

  /** Get a response */
  private getResponse({key, type, value}: RemixResponse) {
    switch (key) {
      case 'app': {
        break;
      }
      case 'compiler': {
        this.compilationResult.next(value[0]);
        break;
      }
      case 'config': {
        break;
      }
      case 'editor': {
        break;
      }
      case 'txlistener': {
        if (type === 'getCurrentFile') { this.currentFileName.next(value[0]); }
        if (type === 'getFile') { this.currentFile.next(value[0]); }
        break;
      }
      case 'udapp': {
        break;
      }
      default: break;
    }
  }

  /** Get a message from remix */
  public getMsg(event: MessageEvent) {
    if (this.remixUrl.indexOf(event.origin) === -1) { return; }
    this.source = event.source as Window;
    this.dispatchMsg(JSON.parse(event.data));
  }

  /** Forge a request to Remix */
  public request(key: RemixKey, type: RemixTypeRequest,  value: any[] = []) {
    const action = remixAction.request;
    this.postMsg({ action, key, type, value, id: this.msgId });
    this.msgId++;
  }
}
