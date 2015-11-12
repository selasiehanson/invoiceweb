/// <reference path="../../typings/tsd.d.ts" />

import { AuthInterceptor}  from '../components/shared/auth-interceptor';

let Routes = ($stateProvider: ng.ui.IStateProvider, 
	$urlRouterProvider: ng.ui.IUrlRouterProvider, 
	$httpProvider: angular.IHttpProvider) => {
	
  $stateProvider.state('login', {
      url:'/login',
      template:  require('../components/login/login.html'),
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
	.state('/signup', {
		url:'/signup',
		template:  require('../components/login/signup.html'),
      	controller: 'LoginCtrl',
      	controllerAs: 'login'
	})
	.state('/password_recovery', {
		url:'/password_recovery',
		template:  require('../components/login/password_recovery.html'),
      	controller: 'LoginCtrl',
      	controllerAs: 'login'
	})
	.state('/settings', {
		url: '/settings',
		template: require('../components/settings/setting.html'),
		controller: 'SettingsController',
		controllerAs: 'settings'
	})
	.state('app', {
		url: '/:app',
		template: require('../components/shared/main.html'),
	})
	.state('app.dashboard', {
		url: 'app/dashboard',
		template: require('../components/dashboard/list.html')
	})
    .state('app.index', {
		url: '/:url',
		templateUrl: function(state: ng.ui.IStateParamsService) {
			return '/app/components/shared/list.html';
		},
		controller: 'AppIndexController',
		controllerAs: 'appIndex'
	})	
	// .state('app.invoices.new', {
	// 	url: '/app/invoices/new',
	// 	// template: require('../components/invoices/new.html'),
	// 	controller: 'InvoiceFormCtrl',
	// 	controllerAs: 'invoiceForm'
	// })
	.state('app.index.new', {
		url: '/new?view',
		templateUrl: function(state: ng.ui.IState) {
			return '/app/components/shared/new.html';
		},
		// resolve: {
		// 	controllerName:function ($stateParams: ng.ui.IStateParamsService, $timeout: angular.ITimeoutService, $q: angular.IQService){
		// 		var deferred = $q.defer();
		// 		$timeout(function(){
		// 			let ctrl = ''; 
		// 			ctrl = 'AppFormController';
		// 			if($stateParams['url'] === 'invoices'){
		// 				ctrl = 'InvoiceFormCtrl';
		// 			}
					
		// 			deferred.resolve(ctrl);
		
		// 		},250);
		// 		return deferred.promise;
		// 	}
		// },
		// controllerProvider: function (controllerName: string){
		// 	return controllerName;
		// },
		controllerProvider: function($stateParams: ng.ui.IStateParamsService){
			if($stateParams['url'] === 'invoices'){
				return 'InvoiceFormCtrl';
			}
			return 'AppFormController';
		},
		controllerAs: 'appForm'
	})
	.state('app.index.show', {
		url: '/:id?view',
		templateUrl: function(stateParams: ng.ui.IStateParamsService) {
			return '/app/' + stateParams['id'] + '?app=' + stateParams['app'] + '&url=' +
				stateParams['url'];
		},
		controller: 'AppFormController'
	})
	.state('app.index.edit', {
		url: '/:id/edit?view',
		templateUrl: function(stateParams: ng.ui.IStateParamsService) {
			return '/app/components/shared/new.html';
		},
		controller: 'AppFormController',
		controllerAs: 'appForm'
	});

	$urlRouterProvider.otherwise('app/dashboard');
  	$httpProvider.interceptors.push('AuthInterceptor');
};

export { Routes };