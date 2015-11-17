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
	invoiceDate?: Date,
	dueDate?: Date
	recipient?: IRecipient
	currency?: ICurrency
	recipientId?: number
	currencyId?: number
	tax?: number
	total?: number | string
	invoiceItems?: InvoiceItem[]
	notes?: string
}

interface  ICurrency{
	currencyName: string
	currencyCode: string
	symbol: string
	id: number
}

interface IRecipient {
	id: number;
	name: string
	email: string
	phoneNumber: string
	address: string
}

class InvoiceFormCtrl extends AppFormController{
	recipients: Object[]
	currentInvoice: IInvoice; 
	previewInvoice: IInvoice;
	currencies: ICurrency[]; 
	invoiceUrl: string;
	previewHtml: string = '';
	showPreview = false;
	
	static $inject = ['$state', '$stateParams', 'Fetcher', '$http', "$rootScope"];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
		_fetcher: Fetcher, _http: angular.IHttpService, rootScope: angular.IRootScopeService) {
		super(_state, _stateParams,_fetcher, rootScope);	
		fetcher = _fetcher;
		http = _http;						
				
		this.currentInvoice = <IInvoice>{tax: 0, total: ""};
		this.currentInvoice.invoiceItems = [];
				
		
		this.invoiceUrl = '';	
		rootScope.$on('record:loaded', (ev, invoice) => {
			this.currentInvoice  = invoice;
			fetcher.query('currencies').then((response) => {
				this.currencies = <ICurrency[]>response.data;
				this.currentInvoice.currency =  _.find(this.currencies, ((x: ICurrency) => x.id === this.currentInvoice.currencyId));			
			});
			
			fetcher.query('recipients').then((response) => {
				this.recipients = <IRecipient[]>response.data;
				this.currentInvoice.recipient = _.find(this.recipients,((x: IRecipient) => x.id === this.currentInvoice.recipientId));
			});
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
		let toBeRmoved = this.currentInvoice.invoiceItems[index]
		if(toBeRmoved.id){
			//remove from server side first
			fetcher.remove('invoice-items', toBeRmoved.id).then((res) => {
				this.currentInvoice.invoiceItems.splice(index, 1);	
			});
		}else {
			this.currentInvoice.invoiceItems.splice(index, 1);
		}
		
	}	
	
	endPreview(){
		this.showPreview = false;		
	}
	
	computeTotal(){
		let total = this.currentInvoice.invoiceItems
			.map((x) => {
				if(x.unitCost && x.quantity){
					return x.unitCost * x.quantity;
				}
				return 0;
			})
			.reduce((prev: number, curr: number) => prev + curr, 0);
	
		let tax = this.currentInvoice.tax / 100.0;
		return (total * tax ) + total;
	}
	
	performRemoveItem(){
		
	}
	
	preview(){
		this.showPreview = true;
		return
		let url = '/templates/invoices/preview';
		http.get(url).then((response) =>{
			this.previewHtml = <string>response.data;
			this.showPreview = true;	
			this.currentInvoice.total = this.computeTotal();
		});
	}
	
	save(){
		this.currentInvoice.recipientId = this.currentInvoice.recipient.id;
		this.currentInvoice.currencyId = this.currentInvoice.currency.id;
		let data = angular.copy(this.currentInvoice)
		delete data.currency;
		delete data.recipient;		
		fetcher.save('invoices',data).then((res) => {
			console.log(res)
		});		
	}
}

export { InvoiceFormCtrl };