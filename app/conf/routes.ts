/// <reference path="../../typings/tsd.d.ts" />

import { AuthInterceptor}  from '../components/shared/auth-interceptor';

let newEditController = function($stateParams: ng.ui.IStateParamsService){
	if($stateParams['url'] === 'invoices'){
		return 'InvoiceFormCtrl';
	}
	return 'AppFormController';
}

let sharedIndexController = function($stateParams: ng.ui.IStateParamsService) {
	if($stateParams['url'] === 'settings') {
		return 'SettingsController';
	}
	return 'AppIndexController';
}

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
	.state('app', {
		url: '/:app',
		template: require('../components/shared/main.html'),
	})
	.state('app.dashboard', {
		url: 'app/dashboard',
		template: require('../components/dashboard/list.html')
	})
	.state('app.settings', {
		url: 'app/settings',
		template: require('../components/settings/setting.html'),
		controller: 'SettingsController',
		controllerAs: 'settings'
	})
    .state('app.index', {
		url: '/:url',
		templateUrl: function(state: ng.ui.IStateParamsService) {
			return '/app/components/shared/list.html';
		},
		controller: 'AppIndexController',
		controllerAs: 'appIndex'
	})	
	.state('app.index.new', {
		url: '/new?view',
		templateUrl: function(state: ng.ui.IState) {
			return '/app/components/shared/new.html';
		},
		controllerProvider: newEditController,
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
		controllerProvider: newEditController,
		controllerAs: 'appForm'
	});

	$urlRouterProvider.otherwise('app/dashboard');
  	$httpProvider.interceptors.push('AuthInterceptor');
};

export { Routes };