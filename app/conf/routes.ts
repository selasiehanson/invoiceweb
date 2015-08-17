/// <reference path="../../typings/tsd.d.ts" />

import { AuthInterceptor}  from '../components/shared/auth-interceptor';

let Routes = ($stateProvider: ng.ui.IStateProvider, 
	$urlRouterProvider: ng.ui.IUrlRouterProvider, 
	$httpProvider: angular.IHttpProvider) => {
	
  $stateProvider.state('login', {
      url:'/login',
      template:  require('../components/shared/login.html'),
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
			controller: 'AppFormController',
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