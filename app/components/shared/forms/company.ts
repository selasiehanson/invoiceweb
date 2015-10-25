/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject } from '../form-interfaces';

const Company: IExtendFormlyObject   = {
  fields: [
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
          key: 'address',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Address',
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
        {
          key: 'phoneNumber',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Phone Number',
            required: true
          }
        },
        {
          key: 'date_created',
          type: 'datepicker',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Date Created',
            required: true
          }
        }
      ]
    }
  ],
  dependencies: []
};

export { Company };
