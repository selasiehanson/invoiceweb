/* jshint esnext: true */
let template = `
    <div class="block-header clearfix">
      <h2 class="pull-left"> {{ title }} </h2>
      <div class="" ng-transclude></div>
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
