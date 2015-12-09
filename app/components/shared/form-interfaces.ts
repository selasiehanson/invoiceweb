/// <reference path="../../../typings/tsd.d.ts" />

interface ICustomAngularFormlyFieldGroup extends AngularFormly.IFieldGroup {
	type?: string
	// templateOptions: any
	// [key: string]: any
}

interface IExtendFormlyObject  {
	fields: ICustomAngularFormlyFieldGroup[]
	dependencies?: string[]
}

interface IForm {
	[key: string]: any
}

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

interface IApiResponse {
	data: {
		message: string
	}
}

export { IExtendFormlyObject, IForm, IUISelectTemplateScope, IUISelectTemplateOptions }