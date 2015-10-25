/// <reference path="../../../typings/tsd.d.ts" />
interface IAxFormTemplate extends angular.IScope{
  template: string;
  record: Object; 
}

function AxForm($compile: angular.ICompileService) {
  return {
    restrict: 'E',
    scope: {
      template: '=',
      record: '='
    }, 
    link: function (scope: IAxFormTemplate, element: angular.IRootElementService){
      var html = angular.element(scope.template);
      var linkFn = $compile(html);
      var content = linkFn(scope);
      element.append(content);
      // console.log(scope);
    }
  };
}

export { AxForm };
