/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject } from '../form-interfaces';
const Clients: IExtendFormlyObject = {
  fields:[
    {
      className : 'row',
      fieldGroup: [
        {
          key: 'first_name',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'First Name',
            required: true
          }
        },
        {
          key: 'last_name',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Last Name',
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
          key: 'phone_number',
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
