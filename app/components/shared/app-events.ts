

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
export  { AuthEvents, RecordEvents };
