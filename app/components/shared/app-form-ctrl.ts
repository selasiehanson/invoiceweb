/// <reference path="../../../typings/tsd.d.ts" />

import { Schema, IModelViewConfig, ISchema, ISchemaDefinition } from './schema';
//import  { Templater } from '../forms/templater';
import { Forms } from './model-forms';
import { IForm, IExtendFormlyObject } from './form-interfaces';
let _ = require('lodash');
//import  { ModelValidator } from './model_validator';
import { Validators } from './validators';
import { IAppStateParams } from './controller-interfaces';
import { Fetcher } from '../../services/fetcher';

let http: angular.IHttpService;
let fetcher: Fetcher;
class AppFormController {
  
  record: any;  
  state: angular.ui.IStateService;
  stateParams: IAppStateParams;
  model: string;  
  templateUrl: string;
  fields: AngularFormly.IFieldConfigurationObject;
  dependencies: Array<string>;
  form: any;
  operation: string;
  handlerText: string;
    
  static $inject = ['$state', '$stateParams', 'Fetcher'];
  constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
    _fetcher: Fetcher){
    this.record = {};
    fetcher = _fetcher;
    this.state = _state;
    this.stateParams = _stateParams;
    let modelProps: ISchemaDefinition = Schema[this.stateParams.url];
    this.model = this.stateParams.url;
    let viewProps = {
      defaultNew: true
    };

    let views :IModelViewConfig = modelProps.views || viewProps;
    _.extend(viewProps, modelProps.views);
    if(!views.defaultNew) {
      //we don't want to use the generic view, we are going to provide one in our component direcotry
      this.templateUrl = `/app/components/${_stateParams.url}/new.html`;
    }else {
      let form: IExtendFormlyObject = Forms[this.model];
      if(form) {
        this.fields = form.fields;
        this.dependencies = form.dependencies;
      }
    }
    
    if(this.stateParams.id) {
      this.operation = 'Edit';
      this.handlerText = "Update";
      fetcher.query(`${this.model}/${this.stateParams.id}`).then((res: angular.IHttpPromiseCallbackArg<{}>) => {
        this.record = res.data;
      });
    }else {
      this.operation = 'New';
      this.handlerText = "Create";
    }
  }

  save(){
    if(this.form.$valid){            
        fetcher.save(`${this.model}`, this.record).then((res:any) => this.state.go('^'));             
    }else {
      //todo: show errors
    }
  }

  cancel(){
    this.state.go('^');
  }
}

export { AppFormController};
