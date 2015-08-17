/// <reference path="../typings/tsd.d.ts" />

import { PeopleCtrl } from "./controllers/people";
import { UserService } from "./services/people";
import { Routes } from "./conf/routes";

import { RouteFinder } from './components/shared/route-finder';
import { AuthToken } from './components/shared/auth-token';
import { AuthInterceptor } from './components/shared/auth-interceptor';
import { MasterCtrl } from './components/master/master';
import { AppIndexController } from './components/shared/app-index-ctrl'
import { AppFormController } from './components/shared/app-form-ctrl'

//components
import { BlockHeader } from './components/block-header/block-header';
import { Card } from './components/card/card';
import { AxForm } from './components/forms/form';
import { CustomElement} from './components/forms/custom_elements';
import { MsgBox } from './components/shared/msg-box';

var app = angular.module("sample", [
    'ui.router',
	'formly',
	'ui.select',
	'formlyBootstrap',
	'ngSanitize',
    'ng-mfb'
]);

app.service("app.services.UserService", UserService);
app.service("RouteFinder", RouteFinder);
app.service("AuthToken", AuthToken);
app.service("MsgBox", MsgBox);
app.service('AuthInterceptor', AuthInterceptor);
app.controller("PeopleController", PeopleCtrl);
app.controller("AppIndexController", AppIndexController);
app.controller("AppFormController", AppFormController);

app.controller('MasterCtrl', MasterCtrl);
//directives
app.directive('axBlockHeader', () => new BlockHeader());
app.directive('axCard', () =>  new Card() );
app.directive('axForm', AxForm );

interface ITableScope extends angular.IScope{
    headers: any,
    content: any,
    sortable: any,
    numPages: number,
    tablePage: number,
    count: number,
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
			headers: '=',
			content: '=',
			sortable: '=',
			filters: '=',
			customClass: '=customClass',
			thumbs: '=',
			count: '='
		},
		controller: function($scope : ITableScope, $filter: angular.IFilterService, $window: angular.IWindowService) {
			var orderBy = $filter('orderBy');
			$scope.content = $scope.content || [];
			$scope.numPages = 0;
			$scope.tablePage = 0;

			$scope.$watch('content', function(val: Array<any>) {
				if (val) {
					$scope.numPages = Math.ceil(val.length / $scope.count);
				}
			});

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

app.run((formlyConfig: AngularFormly.IFormlyConfig ) => {
	formlyConfig.setType(CustomElement['UISelect']);
    console.log("Application Started");
});
