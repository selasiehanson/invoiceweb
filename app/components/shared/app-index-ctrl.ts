/// <reference path="../../../typings/tsd.d.ts" />

import { Schema }  from './schema';
import { ITableHeader }  from './schema';
let _ = require('lodash');
let inflection = require('inflection');
import { IAppStateParams } from './controller-interfaces';

class AppIndexController {

  http: angular.IHttpService;
  state: angular.ui.IStateService;
  stateParams: IAppStateParams;
  model: string;
  headers: Array<ITableHeader>;
  sortable: Array<string>
  custom: any;
  count: number;
  records: Array<any>;
  titleSingular: string;
  templateUrl: string;

  constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, _http: angular.IHttpService) {
    this.http = _http;
    this.state = _state;
    this.stateParams = _stateParams;
    this.model = this.stateParams.url;    
    this.headers = Schema[this.model].headers;
    this.custom = Schema[this.model].custom;
    this.sortable = [];
    if (this.headers) {
      this.sortable = _.pluck(this.headers.filter((h: ITableHeader) => { return h.sort; }), 'field');
    }
    this.count = 3;
    //fetch records
    this.records = [];
    this.getRecords();
    this.titleSingular = inflection.singularize(this.model);

    let modelProps = Schema[this.stateParams.url];
    let viewProps = {
      defaultList: true
    };
    _.extend(viewProps, modelProps.views);
    if (!viewProps.defaultList) {
      this.templateUrl = `/app/components/${this.model}/list.html`;
    }    
  }

  getRecords() {
    this.http.get(`/api/${this.model}`).then((res: angular.IHttpPromiseCallbackArg<any[]>) => {
      this.records = res.data;
    });
  }
  
  goToNew() {
    this.state.go('.new');
  }
}

AppIndexController.$inject = ['$state', '$stateParams', '$http'];
export { AppIndexController };
