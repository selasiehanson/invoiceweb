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
	unitCost?: number
	price?: number
	quantity?: number
}

interface IInvoice {
	invoiceDate: Date
	recipient: number
	tax: number
	total: number
	invoiceItems: InvoiceItem[]
	notes?: string
}

interface  ICurrency{
	currencyName: string
	currencyCode: string
	symbol: string
}

interface IRecipient {
	name: string
	email: string
	phoneNumber: string
	address: string
}

class InvoiceFormCtrl extends AppFormController{
	recipients: Object[]
	currentInvoice: IInvoice; 
	currencies: ICurrency[]; 
	
	static $inject = ['$state', '$stateParams', 'Fetcher'];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, _fetcher: Fetcher) {
		fetcher = _fetcher;
		super(_state, _stateParams,_fetcher);				
		
		this.currentInvoice = <IInvoice>{};
		this.currentInvoice.invoiceItems = [];
		
		fetcher.query('currencies').then((response) => {
			this.currencies = <ICurrency[]>response.data;
		});
		
		fetcher.query('recipients').then((response) => {
			this.recipients = <IRecipient[]>response.data;
		});		
		
	}
	
	addItem(){
		this.currentInvoice.invoiceItems.push(<InvoiceItem>{});
	}
	
	computeLineTotal(quantity: number, unitCost: number) : string | number{
		if(quantity && unitCost){
			return quantity * unitCost;
		}	
		return '';
	}	
	
	removeItem(index: number){
		this.currentInvoice.invoiceItems.splice(index, 1);
	}	
	
	computeTotal(){
		return this.currentInvoice.invoiceItems
			.map((x) => {
				if(x.unitCost && x.quantity){
					return x.unitCost * x.quantity
				}
				return 0;
			})
			.reduce((prev: number, curr: number) => prev + curr, 0);
	}
	
	performRemoveItem(){
		
	}
	
	save(){
		console.log(this.currentInvoice);
	}

	
			
}

export { InvoiceFormCtrl };