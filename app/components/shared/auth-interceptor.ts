/// <reference path="../../../typings/tsd.d.ts" />

import { MsgBox } from './msg-box';
import { AuthToken } from './auth-token';
import { AuthEvents } from './auth-events';
import { IHttpStatus } from './controller-interfaces';
let _ = require('lodash');

let _injector : angular.auto.IInjectorService;
let _q: angular.IQService;


function buildMessage(res: angular.IHttpPromiseCallbackArg<any>) {
  if (res.data.success) {
    if (res.data.message) return res.data.message;
    return (res.config.method === "DELETE") ? "Record deleted successfully." : "Record saved successfully.";
  } else {
    return res.data.message || "Error in performing operation. Check system logs for more details";
  }
}

interface IHttpPromiseWithAuthArg<T> extends angular.IHttpPromiseCallbackArg<T> {
  // headers
}

class AuthInterceptor {

  static $inject = ['$q', '$injector'];
  constructor(q:angular.IQService, injector: angular.auto.IInjectorService) {
    _injector = injector;
    _q = q;
  }

  request(config: angular.IRequestConfig): angular.IRequestConfig | angular.IPromise<angular.IRequestConfig> {
    var authToken = <AuthToken>_injector.get("AuthToken");
    var token = authToken.getT();
    //config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config || _q.when(config);
  }

  response(res: angular.IHttpPromiseCallbackArg<any>) {
    if (res.status === 200 && _.startsWith(res.config.url,'/api')) {
      var message = buildMessage(res);
      if (res.headers()['content-type'] === 'application/json') {
        MsgBox.success(message);
      }
    }
    return res || _q.when(res);
  }

  requestError(errorRequest:angular.IHttpPromiseCallbackArg<any>) {
    return _q.reject(errorRequest);
  }

  responseError(response: angular.IHttpPromiseCallbackArg<any>) {
    // var authEvents = <AuthEvents>_injector.get('AuthEvents');
    var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/singin'));
    let HttpStatus : IHttpStatus = {
        401: AuthEvents.notAuthenticated,
        403: AuthEvents.notAuthorized,
        419: AuthEvents.sessionTimeouts
    };
    if (!matchesAuthenticatePath) {
      var rootScope = <angular.IRootScopeService>_injector.get('$rootScope')
      rootScope.$broadcast(HttpStatus[response.status], response);      
      MsgBox.error("Request " + response.statusText);
    } else {      
      MsgBox.error(response.data.message || response.statusText);
    }
    return _q.reject(response);
  }
}


export { AuthInterceptor };
