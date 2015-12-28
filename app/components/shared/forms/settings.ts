/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject, IUISelectTemplateScope, IUISelectTemplateOptions } from '../form-interfaces';
import { Fetcher } from '../../../services/fetcher';
const SettingsProfile: IExtendFormlyObject  = {
	fields: [
		{
			className: 'row',
			fieldGroup: [
				{
					key: 'username',
					type: 'input',
					className: 'col-xs-6',
					templateOptions: {
						label: 'Name',
						required: true,
					}
				},
				{
					key: 'email',
					type: 'input',
					className: 'col-xs-6',
					templateOptions: {
						label: 'Email',
						required: true,
					}
				}														
			]
		}		
	],
	dependencies: []
};

const SettingsCompanyDetails: IExtendFormlyObject  = {
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
          key: 'email',
          type: 'input',
          className: 'col-xs-5',
          templateOptions: {
            label: 'Email',
            required: true
          }
        },
		   {
          key: 'phoneNumber',
          type: 'input',
          className: 'col-xs-3',
          templateOptions: {
            label: 'Phone Number',
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
              className: 'col-xs-6',
              templateOptions: {
                label: 'Address',
                required: true
              }
         },
		     {
            key: 'website',
            type: 'input',
            className: 'col-xs-6',
            templateOptions: {
              label: 'Website'           
            }
          },
      ]
    }
  ],
  dependencies: []	
}

interface ICurrency {
  currencyName?: string
  symbol?: string
  code?: string
  name?: string
  country?: string
}

let fetchCurrencies = function($scope: IUISelectTemplateScope, fetcher: Fetcher) {
	fetcher.query('currencies').then((res: angular.IHttpPromiseCallbackArg<Array<any>>) => {
    $scope.to.options = <any[]>res.data.map((x: ICurrency) => {
      if(x.symbol) x.name = `(${x.symbol})${x.currencyName} - ${x.country}` ;
      else x.name = `${x.currencyName} - ${x.country}` ;
      return x;
    });
	});												
}; 

const SettingsCurrencies = {
  fields: [
     {
      className : 'row',
      fieldGroup: [
        {
          key: 'currencyIds',
          type: 'ui-multi-select',
          className: 'col-xs-12',
          templateOptions:<IUISelectTemplateOptions> {
            label: 'Currencies',
            required: true,
            placeHolder: 'Select a currency',
            options: [],
            valueProp: 'id',
            labelProp: 'name'
          },
          controller: ["$scope", "Fetcher", fetchCurrencies]
        }
      ]
    }
  ]
}



export { SettingsProfile, SettingsCompanyDetails, SettingsCurrencies}