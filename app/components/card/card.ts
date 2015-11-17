let template = `
    <div class="card">
      <div class="card-header" ng-if="title != ''">
        <h2 > {{ title }} </h2>
      </div>
      <div class="card-padding-top" ng-if="title == ''"></div>
      <div class="card-body" ng-transclude>
      </div>
    </div>
  `;

class Card {
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

Card.$inject = [];

export { Card };
