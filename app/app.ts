/// <reference path="../typings/tsd.d.ts" />

import { Fetcher } from './services/fetcher';
import { Routes } from "./conf/routes";

import { RouteFinder } from './components/shared/route-finder';
import { Store, ILocalStore } from './components/shared/store';
import { AuthInterceptor } from './components/shared/auth-interceptor';

//shared controllers
import { LoginCtrl } from './components/login/login';
import { MasterCtrl } from './components/master/master';
import { AppIndexController } from './components/shared/app-index-ctrl';
import { AppFormController } from './components/shared/app-form-ctrl';
import { InvoiceFormCtrl } from './components/invoices/invoice_form_ctrl'
import { SettingsController }  from  './components/settings/settings'


//components
import { BlockHeader } from './components/block-header/block-header';
import { Card } from './components/card/card';
import { AxForm } from './components/forms/form';
import { CustomElement} from './components/forms/custom_elements';
import { MsgBox } from './components/shared/msg-box';
import { AxBindHtmlCompile } from './components/directives/bindHtmlCompile';
let _ = require('lodash');

var app = angular.module("sample", [
    'ui.router',
	'formly',
	'ui.select',
	'formlyBootstrap',
	'ngSanitize',
    'ng-mfb',
	'angular-loading-bar', 
	'ngFileUpload'
]);

app.service("RouteFinder", RouteFinder);
app.service("Store", Store);
app.service("MsgBox", MsgBox);
app.service('AuthInterceptor', AuthInterceptor);
app.service('Fetcher',Fetcher);
app.controller("AppIndexController", AppIndexController);
app.controller("AppFormController", AppFormController);
app.controller("LoginCtrl", LoginCtrl);
app.controller("InvoiceFormCtrl", InvoiceFormCtrl);
app.controller("SettingsController", SettingsController);

app.controller('MasterCtrl', MasterCtrl);
//directives
app.directive('axBlockHeader', () => new BlockHeader());
app.directive('axCard', () =>  new Card() );
app.directive('axForm', AxForm );
app.directive('bindHtmlCompile', AxBindHtmlCompile);

app.filter('propsFilter', function() {
  return function(items: Array<any>, props: any) {
    var out: Array<any> = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});

interface ITableScope extends angular.IScope{
  headers: any,
  content: any,
  sortable: any,
  numPages: number,
  tablePage: number,
  count: number,
	idField: string;
	actions: {};
	model: string;
	showActions: string;
	_showActions: boolean;
	actionPermissions: any;
	permissions: any;
	edit(record: any): void;
	trash(record: any): void;
    nbOfPages(): number;
	predicate: boolean;
    handleSort(field: string): boolean;
    order(predicate:boolean, direction:boolean):void ;
    goToPage(page: number):void
    getNumber(num: number): Array<any>;
}
app.directive('axTable', function() {
	return {
		restrict: 'E',
		scope: {
			model: '=',
			headers: '=',
			content: '=',
			sortable: '=',
			filters: '=',
			customClass: '=customClass',
			thumbs: '=',
			count: '=',
			showActions: '@',
			permissions: '=',
			idField: '@'
		},
		controller: function($scope : ITableScope, $filter: angular.IFilterService, $window: angular.IWindowService) {
			var orderBy = $filter('orderBy');
			$scope.content = $scope.content || [];
			$scope.numPages = 0;
			$scope.tablePage = 0;
			$scope.idField = $scope.idField || 'id';
			$scope.actions = $scope.actions ||  {};
      		$scope._showActions = ($scope.showActions) === 'false' ? false : true;

			$scope.$watch('content', function(val: Array<any>) {
				if (val) {
					$scope.numPages = Math.ceil(val.length / $scope.count);
				}
			});
			
			$scope.actionPermissions = {};
			var perm = $scope.permissions || {};
			$scope.actionPermissions.edit = (perm.edit === false) ? false : true;
			$scope.actionPermissions.remove = (perm.remove === false) ? false : true;
		
			$scope.edit =  function (record){
				$scope.$emit('model:pre-edit', {
					model: $scope.model,
					data: record,
					id: record[$scope.idField]
				});
			};
		
			$scope.trash =  function (record){
				$scope.$emit('model:pre-delete', {
					model: $scope.model,
					data: record,
					id: record[$scope.idField]
				});
			};

			$scope.nbOfPages = function():number {
				if (!$scope.content) {
					return 0;
				}
				return Math.ceil($scope.content.length / $scope.count);
			};

			$scope.handleSort = function(field: string): boolean {
				if ($scope.sortable.indexOf(field) > -1) {
					return true;
				} else {
					return false;
				}
			};
            
			$scope.order = function(predicate:boolean, reverse:boolean) {
				$scope.content = orderBy($scope.content, predicate, reverse);
				$scope.predicate = predicate;
			};

			if($scope.sortable.length > 0 ){
				$scope.order($scope.sortable[0], false);
			}

			$scope.getNumber = function(num: number) {
				return new Array(num);
			};
            
			$scope.goToPage = function(page: number) {
				$scope.tablePage = page;
			};
		},
		templateUrl: '/app/components/table/table.html'
	};
})

app.filter('startFrom', function() {
	return function(input:Array<any>, start: number) {
		start = +start;
		return input.slice(start);
	};
});

export { app };

app.config(Routes);
app.config(['cfpLoadingBarProvider', (cfpLoadingBarProvider:any) => {
  cfpLoadingBarProvider.includeSpinner = false;
}])

app.run((formlyConfig: AngularFormly.IFormlyConfig ) => {
	console.log(CustomElement);
	formlyConfig.setType(CustomElement['UISelect']);
	formlyConfig.setType(CustomElement['DatePicker']);
	formlyConfig.setType(CustomElement['UIMultiSelect']);
    console.log("Application Started");
});

app.run(($rootScope: angular.IRootScopeService, $location: angular.ILocationService, 	
	Store: ILocalStore, $stateParams: angular.ui.IStateParamsService) =>{
		
	let excludedRoutes = ['/signup', '/login', '/password_recovery'];
    $rootScope.$on('$stateChangeStart', function (event, next) {

		if(_.contains(excludedRoutes,next.url)) {
			return
		};
		
		if(!Store.getToken()) {
			$location.path('/login');
		}
    });
});

