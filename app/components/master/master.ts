/// <reference path="../../../typings/tsd.d.ts" />

//import { AuthEvents } from '../components/shared/auth_events';
// import { AuthToken }  from '../components/shared/auth_token';

import { AuthEvents } from '../shared/auth-events';
import { AuthToken } from '../shared/auth-token';
let _ = require('lodash');
let inflection = require('inflection');
import { IAppStateParams } from '../shared/controller-interfaces';
import { Fetcher } from '../../services/fetcher'

let http : angular.IHttpService;
let client = Object;
let rootScope: angular.IRootScopeService;
let authToken: AuthToken;
let fetcher: Fetcher;

interface INav {
	name: string;
	icon: string;
	route: string;
}

class MasterCtrl {

	state: angular.ui.IStateService;
	stateParams: angular.ui.IStateParamsService;
	navs: Array<INav>;
	loggedIn: boolean;
	currentRouteName: string;
	model: string;
	pageTitle: string;
	
	static $inject = ['$http', '$rootScope', '$state', '$stateParams', 'AuthToken', 'Fetcher'];
	constructor(_http:angular.IHttpService, _rootScope: angular.IRootScopeService, 
		_state: angular.ui.IStateService, _stateParams: angular.ui.IStateParamsService, 
		_authToken: AuthToken, _fetcher: Fetcher) {
			
		http = _http;
		this.state = _state;
		this.stateParams = _stateParams;		
		authToken = _authToken;
		fetcher = _fetcher;

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
				name: 'jobs',
				icon: 'zmdi-attach-money',
				route: "/app/jobs"
			},
			// {
			// 	name: 'products',
			// 	icon: 'zmdi-add-shopping-cart',
			// 	route: "/app/products"
			// }, {
			// 	name: 'companies',
			// 	icon: 'zmdi-contacts',
			// 	route: "/app/companies"
			// },
			{
				name: 'reports',
				icon: 'zmdi-trending-up',
				route: "/app/reports"
			}
		];

		rootScope = _rootScope;			
		console.log(this.stateParams);		

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

		rootScope.$on('$stateChangeSuccess', (event: angular.IAngularEvent, toState: angular.ui.IStateService, 
			toStateParams: IAppStateParams) => {
			console.log(toStateParams);
			if(toStateParams.url) {				
				this.pageTitle = inflection.titleize(toStateParams.url);
			}
		});
		
		// this.handleDelete();
	}
	

	signout() {
		authToken.destroyT();
		rootScope.$broadcast(AuthEvents.logoutSuccess);
	}	
	
	pathContains (routeId: string){	  
      return window.location.hash.indexOf(routeId) >= 0;
    }
}

export { MasterCtrl };