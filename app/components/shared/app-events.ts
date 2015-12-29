

import { IHttpStatus } from './controller-interfaces';

let AuthEvents = {
  loginSuccess: 'auth:login-success',
  logoutSuccess: 'auth:logout-success',
  loginFailed: 'auth:login-failed',
  notAuthenticated: 'auth:not-athenicated',
  sessionTimeouts: 'auth:session-timeouts',
  notAuthorized: 'auth:not-authorized'
};


let RecordEvents = {
  recordLoaded:  'record:loaded',
  recordsLoaded:  'records:loaded',
}

const ModelEvents = {
  preEdit: 'model:pre-edit',
  preDelete: 'model:pre-delete'
}
export  { AuthEvents, RecordEvents, ModelEvents };
