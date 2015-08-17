/// <reference path="../../../typings/tsd.d.ts" />

interface ItemplateOptions {
  label?:string, 
  required?: boolean
}

interface ITemplate{
  key: string,
  type: string;
  className?: string
  templateOptions: ItemplateOptions
}

class Templater {
  output: Array<string>
  constructor(){
    this.output = [];
  }

  createForm(config: Array<any>){
    config = config || [];
    this.output = [];
    if(config.length === 0) return;
    var result = '';

    for(let i=0; i < config.length; ++i){
      if(!angular.isArray(config[i])) continue;

      for(let j = 0; j < config[i].length; ++j){
        let item = config[i][j];
        this.addToPipeline(item);
      }
    }
    return this.output.join('\n');
  }

  addToPipeline(item: ITemplate){
    switch (item.type) {
      case 'textarea':
        this.output.push(this.textarea(item));
        break;
      case 'drop':
        this.output.push(this.drop(item));
        break;
      case 'checkbox':
        this.output.push(this.checkBox(item));
        break;
      default:
        this.output.push(this.input(item));
      break;
    }
  }

  input(item): string{
    let klass = item.klass || '';
    let template = `
      <div class="${klass}">
        <div ng-class="record.errors.${item.field} !== undefined ? 'form-group has-error': 'form-group' ">
          <label class="control-label"> ${item.label} </label>
          <input type="text" class="form-control" ng-model="record.${item.field}">
          <small class="error"> {{ record.errors.${item.field} }} </small>
        </div>
      </div>
    `;
    //console.log(template);
    return template;
  }

  textarea(item): string{
    return "";
  }

  checkBox(item): string{
    return "";
  }

  drop(item){
    return "";
  }
}

export { Templater};
