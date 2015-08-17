/// <reference path="../../../typings/tsd.d.ts" />

interface IExtendFormlyObject  {
	fields: Array<AngularFormly.IFieldConfigurationObject>
	dependencies?: Array<string>
}

interface IForm {
	[key: string]: IExtendFormlyObject
}

interface IApiResponse {
	data: {
		message: string
	}
}

export { IExtendFormlyObject, IForm }