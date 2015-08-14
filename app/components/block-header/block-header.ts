/* jshint esnext: true */
let template = `
    <div class="block-header">
      <h2> {{ title }} </h2>
    </div>
  `;

class BlockHeader {
  template: string;
  restrict: string;
  scope: Object;
  
  constructor(){
    this.template = template;
    this.restrict = 'E';
    this.scope = {
      title: '@'
    };
  }
}

BlockHeader.$inject = [];

export { BlockHeader};
