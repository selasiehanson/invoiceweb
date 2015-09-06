/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject } from '../form-interfaces';
const Clients: IExtendFormlyObject = {
  fields:[
    {
      className : 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          key: 'contactPerson',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Contact Person',
            required: true
          }
        },
        {
          key: 'email',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Email',
            required: true
          }
        },

      ]
    },
    {
      className : 'row',
      fieldGroup: [
        {
          key: 'phone',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Phone Number',
            required: true
          }
        },
        {
          key: 'address',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Address',
            required: true
          }
        },
        {
          key: 'clientType',
          type: 'ui-select',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Type of Customer',
            valueProp: 'abbr',
            labelProp: 'name',
            options: [
              { name: 'Walk in', abbr: 'WI' },
              { name: 'Creditors', abbr: 'CO' }
            ]
          }
        }
      ]
    },
  ],
  dependencies: []
};


export  { Clients };
