/// <reference path="../../../typings/tsd.d.ts" />

//import { AuthEvents } from '../components/shared/auth_events';
// import { AuthToken }  from '../components/shared/auth_token';

import { AuthEvents } from '../shared/auth-events';
import { AuthToken } from '../shared/auth-token';

let http : angular.IHttpService;
let client = Object;
let rootScope: angular.IRootScopeService;
let authToken: AuthToken;

interface INav {
	name: string;
	icon: string;
	route: string;
}

class MasterCtrl {

	state: angular.ui.IStateService;
	navs: Array<INav>;
	loggedIn: boolean;
	currentRouteName: string;
	
	constructor(_http:angular.IHttpService, _rootScope: angular.IRootScopeService, _state: angular.ui.IStateService , _authToken: AuthToken) {
		http = _http;
		this.state = _state;
		authToken = _authToken;

		this.navs = [
			{
				name: 'home',
				icon: 'zmdi-home',
				route: '/app/dashboard'
			},
			{
				name: 'clients',
				icon: 'zmdi-people',
				route: "/app/clients"
			},
			{
				name: 'sales',
				icon: 'zmdi-attach-money',
				route: "/app/sales"
			},
			{
				name: 'products',
				icon: 'zmdi-add-shopping-cart',
				route: "/app/products"
			}, {
				name: 'companies',
				icon: 'zmdi-contacts',
				route: "/app/companies"
			},
			{
				name: 'reports',
				icon: 'zmdi-trending-up',
				route: "/app/reports"
			}
		];

		rootScope = _rootScope;		

		this.loggedIn = true;
		rootScope.$on(AuthEvents.loginSuccess, (ev, args) => {
			if(args && args.user){
				this.loggedIn = true;
				this.state.go('app.dashboard');
			}else {
				this.loggedIn = false;
			}
		});

		rootScope.$on(AuthEvents.logoutSuccess, (ev, args) => {
		  this.state.go('login');        
		});

		rootScope.$on('$stateChangeSuccess', (event: angular.IAngularEvent) => {
			
		});
	}

	signout() {
		authToken.destroyT();
		rootScope.$broadcast(AuthEvents.logoutSuccess);
	}	
	
	pathContains (routeId: string){	  
      return window.location.hash.indexOf(routeId) >= 0;
    }
}

MasterCtrl.$inject = ['$http', '$rootScope', '$state', 'AuthToken'];
export { MasterCtrl };