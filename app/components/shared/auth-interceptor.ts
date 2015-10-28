/// <reference path="../../../typings/tsd.d.ts" />

import { MsgBox } from './msg-box';
import { AuthToken } from './auth-token';
import { AuthEvents } from './auth-events';
import { IHttpStatus } from './controller-interfaces';
let _ = require('lodash');
let inflection = require('inflection');

let _injector : angular.auto.IInjectorService;
let _q: angular.IQService;
let _stateParams: angular.ui.IStateParamsService;


function buildMessage(res: angular.IHttpPromiseCallbackArg<any>, statParams: angular.ui.IStateParamsService) {
  console.log(_stateParams['url']);
  let model = inflection.titleize(inflection.singularize(_stateParams['url']));
  if (_.contains([200, 201],res.status)) {
    if (res.data.message) return res.data.message;
    
    switch(res.config.method){
      case "DELETE":
        return `${model} deleted successfully.`;
      case "PUT":
        return `${model} updated successfully.`;
      case "POST": 
        return `${model} created successfully.`;
      case 'GET':
        if(_stateParams['id']) {
          return `${model} with id ${_stateParams['id']} loaded successfully `;
        }else {
          let modelP = inflection.titleize(inflection.pluralize(_stateParams['url']));
          return `${modelP} loaded successfully`;
        }
    }
  } else {
    return res.data.message || "Error in performing operation. Check system logs for more details";
  }
}

 function showNotification(res: angular.IHttpPromiseCallbackArg<any>, message: string){
    if(_.contains([200,201], res.status)){
      MsgBox.success(message);  
    }else {
      MsgBox.error(message);
    }
    
  }

interface IHttpPromiseWithAuthArg<T> extends angular.IHttpPromiseCallbackArg<T> {
  // headers
}

class AuthInterceptor {

  static $inject = ['$q', '$injector', '$stateParams'];
  constructor(q:angular.IQService, injector: angular.auto.IInjectorService, stateParams: angular.ui.IStateParamsService) {
    _injector = injector;
    _q = q;
    _stateParams = stateParams;
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
    
    if(_.startsWith(res.config.url,'/api')) {
      console.log(res)  
      var message = buildMessage(res, _stateParams);
      let contentType = res.headers()['content-type'];      
      if (_.contains(contentType, 'application/json')) {        
        showNotification(res, message);
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
