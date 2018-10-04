export interface RemixMsg {
  action: RemixAction;
  key: RemixKey;
  type: RemixTypeNotifications | RemixTypeRequest;
  value: any[];
  id: number;
}

export interface RemixRequest {
  action: remixAction.request;
  key: RemixKey;
  type: RemixTypeRequest;
  value: any[];
  id: number;
}

export interface RemixNotification {
  action: remixAction.notif;
  key: RemixKey;
  type: RemixTypeNotifications;
  value: any[];
  id: number;
}

export interface RemixResponse {
  action: remixAction.response;
  key: RemixKey;
  type: RemixTypeRequest;
  value: any[];
  id: number;
}

/**
 * HELPERS
 */

export type RemixAction = 'request' | 'response' | 'notification';
export type RemixKey = 'app' | 'compiler' | 'txlistener' | 'config' | 'udapp' | 'editor';

export type RemixTypeNotifications =
  | 'unfocus'
  | 'focus'
  | 'compilationFinished'
  | 'compilationData'
  | 'newTransaction';

export type RemixTypeRequest =
  | 'getExecutionContextProvider'
  | 'getProviderEndpoint'
  | 'updateTitle'
  | 'setConfig'
  | 'getConfig'
  | 'removeConfig'
  | 'getCompilationResult'
  | 'runTx'
  | 'getAccounts'
  | 'createVMAccount'
  | 'getCurrentFile'
  | 'getFile'
  | 'setFile'
  | 'highlight';

/**
 * ENUMS
 */

export enum remixAction {
  request = 'request',
  response = 'response',
  notif = 'notification'
}

export enum remixKey {
  app = 'app',
  compiler = 'compiler',
  txlistener = 'txlistener',
  config = 'config',
  udapp = 'udapp',
  editor = 'editor'
}

export enum remixTypeRequest {
  getExecutionContextProvider = 'getExecutionContextProvider',
  getProviderEndpoint = 'getProviderEndpoint',
  updateTitle = 'updateTitle',
  setConfig = 'setConfig',
  getConfig = 'getConfig',
  removeConfig = 'removeConfig',
  getCompilationResult = 'getCompilationResult',
  runTx = 'runTx',
  getAccounts = 'getAccounts',
  createVMAccount = 'createVMAccount',
  getCurrentFile = 'getCurrentFile',
  getFile = 'getFile',
  setFile = 'setFile',
  highlight = 'highlight'
}
