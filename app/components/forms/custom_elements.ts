/// <reference path="../../../typings/tsd.d.ts" />

interface ICustonElement{
  [key: string]: AngularFormly.ITypeOptions
}


let selectTemplate = `
  <ui-select 
    ng-model="model[options.key]" 
    theme="bootstrap" 
    ng-required="{{to.required}}" 
    ng-disabled="{{to.disabled}}" 
    reset-search-input="false"> 
    <ui-select-match 
      placeholder="{{to.placeholder}}"> 
        {{$select.selected[to.labelProp || 'name']}} 
    </ui-select-match> 
    <ui-select-choices 
      group-by="to.groupBy" 
      repeat="option[to.valueProp || 'value'] as option in to.options | filter: $select.search"> 
      <div ng-bind-html="option[to.labelProp || 'name'] | highlight: $select.search"></div> 
    </ui-select-choices> 
  </ui-select>
`;

let datePicker = `
  <input ng-model="model[options.key]"
    data-provide="datepicker"
    data-date-format="yyyy-mm-dd"
    data-date-enable-on-readonly="false"
    data-date-calendar-weeks="true"
    data-date-today-btn="true"
    data-date-autoclose="true"
    class="form-control">
`;

const CustomElement: ICustonElement = {
  UISelect: {
    extends: 'select',
    name: 'ui-select',
    template: selectTemplate  
  },
  DatePicker: {
    name: 'datepicker',
    extends: 'input',
    template: datePicker
  }
};

export { CustomElement };
