/// <reference path="../../../typings/tsd.d.ts" />

import { Store } from '../shared/store';
import { AuthEvents } from '../shared/app-events';

let authToken: Store;
let rootScope: angular.IRootScopeService;
let location: angular.ILocationService;

interface IUser {
  id?: number;
  user?: string;
	username?: string;
	password?: string;
  expires?: number;
  roles?: string [];
}

class LoginCtrl {
	notLoggedIn: boolean;
	scope: angular.IScope;
	http: angular.IHttpService;
	user: IUser
  	constructor(_rootScope: angular.IRootScopeService, _http: angular.IHttpService, 
	  _location: angular.ILocationService, _authToken: Store){
    this.notLoggedIn = true;
    this.scope = _rootScope.$new();
    this.scope.$emit('login:state', {user: false});
	
    this.http = _http;
    rootScope = _rootScope;
    location = _location; 
    authToken = _authToken;        
  }

  signup() {
    
  }
  
  recoverPassword(){
    
  }

  signin(){
    let data = this.user;
    console.log(data);
    this.http.post('/api/login', data ).then((response: angular.IHttpPromiseCallbackArg<any>) => {
    console.log(response);
     if(response.status === 200) {
       let token = response.headers("x-auth-token");
       if(token){
          authToken.setToken(token);
          this.fetchUser();
       }       
      //this.scope.$emit('login:state', {user: true});
     } else if(response.status === 401) {
       rootScope.$broadcast(AuthEvents.notAuthorized);
     }else {
      rootScope.$broadcast(AuthEvents.loginFailed);
     }
   });
  }
  
  fetchUser() {
    this.http.get('/api/users/current').then((response: angular.IHttpPromiseCallbackArg<IUser>) => {
      console.log(response.data);
      rootScope.$broadcast(AuthEvents.loginSuccess, response.data);  
    });
    
  }  
}

LoginCtrl.$inject = ['$rootScope', '$http', '$location', 'Store'];

export  { LoginCtrl };
