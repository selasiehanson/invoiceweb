/* jshint esnext: true */
let template = `
    <div class="block-header">
      <h2> {{ title }} </h2>
      <div class="clearfix" ng-transclude></div>
    </div>
  `;

class BlockHeader {
  template: string;
  restrict: string;
  scope: Object;
  transclude: boolean;
  
  constructor(){
    this.template = template;
    this.restrict = 'E';
    this.transclude = true;
    this.scope = {
      title: '@'
    };
  }
}

BlockHeader.$inject = [];

export { BlockHeader};
