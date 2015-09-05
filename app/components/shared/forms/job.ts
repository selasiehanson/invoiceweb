/// <reference path="../../../../typings/tsd.d.ts" />
import { IExtendFormlyObject } from '../form-interfaces';
import { Fetcher } from "../../../services/fetcher";
interface ILookupOption {
	// id: number
	// name: string
	[key:string]: string
}

interface IUISelectTemplateOptions extends AngularFormly.ITemplateOptions {
	valueProp: string;
	labelProp: string;
	options?: Array<ILookupOption>
}


interface IUISelectTemplateScope extends AngularFormly.ITemplateScope {
	to: IUISelectTemplateOptions
}

let fetchClients = function($scope: IUISelectTemplateScope, fetcher: Fetcher) {
	fetcher.query('clients').then((res: angular.IHttpPromiseCallbackArg<Array<any>>) => {
		$scope.to.options = res.data;
	});												
};

const Job = {
	fields:[
		{
			className : 'row',
			fieldGroup: [
				{
					key: 'title',
					type: 'input',
					className: 'col-xs-8',
					templateOptions: {
						label: 'Title',
						required: true
					}
				},
				{
					key: 'clientId',
					type: 'ui-select',
					className: 'col-xs-4',
					templateOptions: <IUISelectTemplateOptions> {
						label: 'Client',
						valueProp: 'id',
						labelProp: 'name',
						options: []
					},
					"controller": ["$scope", "Fetcher",fetchClients]
				}
			]
		}
	]
};

export { Job };