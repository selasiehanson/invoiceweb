/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject } from '../form-interfaces';
const SettingsProfile: IExtendFormlyObject  = {
	fields: [
		{
			className: 'row',
			fieldGroup: [
				{
					key: 'username',
					type: 'input',
					className: 'col-xs-4',
					templateOptions: {
						label: 'Name',
						required: true,
					}
				},
				{
					key: 'email',
					type: 'input',
					className: 'col-xs-4',
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



export { SettingsProfile, SettingsCompanyDetails}