/// <reference path="../../../typings/tsd.d.ts" />

// (function () {
//     'use strict';

//     var module = angular.module('angular-bind-html-compile', []);

//     module.directive('bindHtmlCompile', ['$compile', function ($compile) {
//         return {
//             restrict: 'A',
//             link: function (scope, element, attrs) {
//                 scope.$watch(function () {
//                     return scope.$eval(attrs.bindHtmlCompile);
//                 }, function (value) {
//                     element.html(value);
//                     $compile(element.contents())(scope);
//                 });
//             }
//         };
//     }]);
// }());

interface IBindHtmlCompileAttrs extends angular.IAttributes {
	bindHtmlCompile: string;
}

function AxBindHtmlCompile($compile: angular.ICompileService) {
	return {
		restrict: 'A',
		link: function (scope: angular.IScope, element: angular.IRootElementService, attrs: IBindHtmlCompileAttrs) {
			scope.$watch(function () {
				return scope.$eval(attrs.bindHtmlCompile);
			}, function (value) {
				element.html(value);
				$compile(element.contents())(scope);
			});
		}
	}
}

export { AxBindHtmlCompile }