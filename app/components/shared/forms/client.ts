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
          className: 'col-xs-6',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },        
        {
          key: 'email',
          type: 'input',
          className: 'col-xs-6',
          templateOptions: {
            label: 'Email',
            required: true
          }
        }
      ]
    },
    {
      className : 'row',
      fieldGroup: [
		{
          key: 'address',
          type: 'input',
          className: 'col-xs-8',
          templateOptions: {
            label: 'Address',
            required: true
          }
        },
        {
          key: 'phoneNumber',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Phone Number',
            required: true
          }
        }
      ]
    }
  ],
  dependencies: []
};

export { Clients };