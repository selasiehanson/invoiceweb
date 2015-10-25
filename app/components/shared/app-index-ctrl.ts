/// <reference path="../../../typings/tsd.d.ts" />

import { Schema }  from './schema';
import { ITableHeader }  from './schema';
let _ = require('lodash');
let inflection = require('inflection');
import { IAppStateParams,IModelEventArgs } from './controller-interfaces';
import { Fetcher} from '../../services/fetcher'
import { EditStates} from './edit-states'

let rootScope: angular.IRootScopeService;
let fetcher: Fetcher;
let state: angular.ui.IStateService;

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

  static $inject = ['$rootScope', '$state', '$stateParams', '$http', 'Fetcher'];
  constructor( _rootScope: angular.IRootScopeService, _state: angular.ui.IStateService,
    _stateParams: IAppStateParams, _http: angular.IHttpService, _fetcher: Fetcher) {
      
    this.http = _http;
    state = _state;
    this.stateParams = _stateParams;
    this.model = this.stateParams.url;    
    this.headers = Schema[this.model].headers;
    this.custom = Schema[this.model].custom;
    this.sortable = [];
    rootScope = _rootScope;
    fetcher = _fetcher;
    
    if (this.headers) {
      this.sortable = _.pluck(this.headers.filter((h: ITableHeader) => { return h.sort; }), 'field');
    }
    this.count = 25;
    //fetch records
    this.records = [];
    this.getRecords();
    this.titleSingular = inflection.titleize(inflection.singularize(this.model));

    let modelProps = Schema[this.stateParams.url];
    let viewProps = {
      defaultList: true
    };
    _.extend(viewProps, modelProps.views);
    if (!viewProps.defaultList) {
      this.templateUrl = `/app/components/${this.model}/list.html`;
    } 
    
    this.setupListeners();   
  }
    
  getRecords() {
    this.http.get(`/api/${this.model}`).then((res: angular.IHttpPromiseCallbackArg<any[]>) => {
      this.records = res.data;
    });
  }
  
  goToNew() {
    state.go('.new');
  }
  
  setupListeners() {
    this.handleEdit();
    this.handleDelete();
  }
  
  handleDelete() {
    	rootScope.$on('model:pre-delete', (ev:any, args:IModelEventArgs ) => {
        if(args.model !== this.model){
          return;
        }
        fetcher.remove(`${args.model}`,args.id).then(() => {
          let found = this.records.filter(x => x.id === args.id);
          if(found){
            let idx = this.records.indexOf(found[0]);
            this.records.splice(idx,1);          
            //todo fire post delete message
          }
        });
    	});
  	}
  
  handleEdit(){
    //redirect to edit page
    rootScope.$on('model:pre-edit',  (ev, args) => {
      let nextState = EditStates[this.model];
      if(!nextState){
        nextState = 'app.index.edit';
      }
      state.go(nextState,args);
    });
  }  
}

export { AppIndexController };
