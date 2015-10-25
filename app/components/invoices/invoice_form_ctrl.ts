/// <reference path="../../../typings/tsd.d.ts" />

import { Fetcher } from '../../services/fetcher';
import { IAppStateParams } from '../shared/controller-interfaces';
import { Forms } from '../shared/model-forms';
import { AppFormController } from "../shared/app-form-ctrl"
let _ = require('lodash');

let http: angular.IHttpService;
let fetcher: Fetcher;

interface InvoiceItem {
	id?: number
	name?: string
	description?: string
	total: number
}

interface IInvoice {
	invoiceDate: Date
	recipient: number
	unitCost: number
	price: number
	tax: number
	total: number
	invoiceItems: InvoiceItem[]
	notes?: string
}

class InvoiceFormCtrl extends AppFormController{
	// model: string;
	// stateParams: IAppStateParams;
	person: Object
	people: Object[]
	currentInvoice: IInvoice; 

	static $inject = ['$state', '$stateParams', 'Fetcher'];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, _fetcher: Fetcher) {
		
		super(_state, _stateParams,_fetcher);
		this.person = {};
		this.people = [
			{ name: 'Adam',      email: 'adam@email.com',      phoneNumber: 10898798 },
			{ name: 'Amalie',    email: 'amalie@email.com',    phoneNumber: 12123121 },
			{ name: 'Wladimir',  email: 'wladimir@email.com',  phoneNumber: 30123122 },
			{ name: 'Samantha',  email: 'samantha@email.com',  phoneNumber: 31123123 },
			{ name: 'Estefanía', email: 'estefanía@email.com', phoneNumber: 16923847 },
			{ name: 'Natasha',   email: 'natasha@email.com',   phoneNumber: 54092873 },
			{ name: 'Nicole',    email: 'nicole@email.com',    phoneNumber: 43989879 },
			{ name: 'Adrian',    email: 'adrian@email.com',    phoneNumber: 21677573 }
		];
		
		this.currentInvoice = <IInvoice>{};
		this.currentInvoice.invoiceItems = [];
	}
	
	addItem(){
		console.log('this is a adding')
		this.currentInvoice.invoiceItems.push(<InvoiceItem>{});
	}
	
	removeItem(){
		
	}	
	
	performRemoveItem(){
		
	}

	
			
}

export { InvoiceFormCtrl };