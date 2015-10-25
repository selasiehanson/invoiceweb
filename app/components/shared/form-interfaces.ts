/// <reference path="../../../typings/tsd.d.ts" />

interface IExtendFormlyObject  {
	fields: AngularFormly.IFieldGroup[]
	dependencies?: string[]
}

interface IForm {
	[key: string]: any
}

interface IApiResponse {
	data: {
		message: string
	}
}

export { IExtendFormlyObject, IForm }