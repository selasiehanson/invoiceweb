/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject } from '../form-interfaces';

const Product: IExtendFormlyObject  = {
  fields: [ 
    {
      className: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Name',
            required: true,
          }
        },
        {
          key: 'product_category_id',
          type: 'ui-select',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Product Category',
            required: true,
            labelProp: 'name',
            valueProp: 'id',
            options: [
              {id: 1, 'name': 'test'}
            ]
          }
        },
        {
          key: 'code',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Code',
          }
        }
      ]
    },
    {
      className: 'row',
      fieldGroup: [
        {
          key: 'sellingPrice',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Selling Price',
            required: true,
          }
        },
        {
          key: 'reorderLevel',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Re-Order Level',
            required: true,
          }
        },
        {
          key: 'maximumStock',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Maximum Stock',
            required: true,
          }
        }
      ]
    },
  ],
  dependencies: []
};

export { Product };
