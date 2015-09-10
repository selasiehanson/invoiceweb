/// <reference path="../../../typings/tsd.d.ts" />

import { AuthToken } from './auth-token';
import { AuthEvents } from './auth-events';

let authToken: AuthToken;
let rootScope: angular.IRootScopeService;
let location: angular.ILocationService;

interface IUser {
	username: string;
	password: string;
}

class LoginCtrl {
	notLoggedIn: boolean;
	scope: angular.IScope;
	http: angular.IHttpService;
	user: IUser
  	constructor(_rootScope: angular.IRootScopeService, _http: angular.IHttpService, 
	  _location: angular.ILocationService, _authToken: AuthToken){
    this.notLoggedIn = true;
    this.scope = _rootScope.$new();
    this.scope.$emit('login:state', {user: false});
	
    this.http = _http;
    rootScope = _rootScope;
    location = _location; 
    authToken = _authToken;        
  }

  signin(){
    let data = this.user;
    console.log(data);
    this.http.post('/api/auth/sign_in',{ user: data} ).then((response: angular.IHttpPromiseCallbackArg<any>) => {
    console.log(response);
     if(response.status === 200 && response.data.token) {
       authToken.setT(response.data.token);
       rootScope.$broadcast(AuthEvents.loginSuccess, response.data);
      //this.scope.$emit('login:state', {user: true});
     } else if(response.status === 401) {
       rootScope.$broadcast(AuthEvents.notAuthorized);
     }else {
      rootScope.$broadcast(AuthEvents.loginFailed);
     }
   });
  }  
}

LoginCtrl.$inject = ['$rootScope', '$http', '$location', 'AuthToken'];

export  { LoginCtrl };
