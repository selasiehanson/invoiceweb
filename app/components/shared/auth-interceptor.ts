/// <reference path="../../../typings/tsd.d.ts" />

import { MsgBox } from './msg-box';
import { AuthToken } from './auth-token';
import { AuthEvents } from './app-events';
import { IHttpStatus } from './controller-interfaces';
let _ = require('lodash');
let inflection = require('inflection');

let _injector : angular.auto.IInjectorService;
let _q: angular.IQService;
let _stateParams: angular.ui.IStateParamsService;


function buildMessage(res: angular.IHttpPromiseCallbackArg<any>, stateParams: angular.ui.IStateParamsService) {
  let model = inflection.titleize(inflection.singularize(stateParams['url']));
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
        if(stateParams['id']) {
          return `${model} with id ${stateParams['id']} loaded successfully `;
        }else {
          //todo: cache inflection for all models so lets say we have function that 
          //when passed a model can give us all the pluralize, singulaize and humanized values  
          let modelP = inflection.titleize(inflection.pluralize(stateParams['url']));
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
      // config.headers.Authorization = "Bearer " + token;
      config.headers['X-AUTH-TOKEN'] = token;
    }
    return config || _q.when(config);
  }

  response(res: angular.IHttpPromiseCallbackArg<any>) {
    let excludedRoutes = ['/api/login', '/api/users/current', '/login', '/password_recovery'];
    let url = res.config.url;
    
    if(_.startsWith(url,'/api') && !_.contains(excludedRoutes,url) ) { 
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
    var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/login'));
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
