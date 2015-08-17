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
          key: 'contact_person',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Contact Person',
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
