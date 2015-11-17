/// <reference path="../../../typings/tsd.d.ts" />

import { Fetcher } from '../../services/fetcher';
import { IAppStateParams } from '../shared/controller-interfaces';
import { Forms } from '../shared/model-forms';
import { AppFormController } from "../shared/app-form-ctrl"
let _ = require('lodash');

let http: angular.IHttpService;
let fetcher: Fetcher;
let sce: angular.ISCEService;
let templateCache: angular.ITemplateCacheService;

let templateHtml = `
<div class="invoice-preview">

    <div class="clearfix">
        <div class="mid-box pull-left">
            <h1>Name / Logo</h1>
        </div>
        <div class="lil-box pull-right">
            <h2 class="invoice-title">Service Invoice</h2>
            <div class="">
                <label for="" class="origin-destination-marker"> From </label>
                <table class="table">
                    <tr><td> <b>Company Name</b> </td></tr>
                    <tr><td> company address</td></tr>
                    <tr><td> company-email@mail.com</td></tr>
                    <tr><td> +122 898 782 9098</td></tr>
                </table>
            </div>
        </div>
    </div>

    <div class="clearfix">
        <div class="mid-box pull-left">
            <label for="" class="origin-destination-marker">Summary</label>
            <table class="table">
                <tbody>
                <tr>
                    <td>Invoice No:</td>
                    <td> SNDLBZ1237888 </td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td> {{ appForm.currentInvoice.invoiceDate }} -  {{ appForm.currentInvoice.dueDate }} </td>
                </tr>
                <tr>
                    <td><b> Amount Due </b></td>
                    <td>
                        <b>{{ appForm.currentInvoice.currency.symbol }} {{ appForm.currentInvoice.total }}</b>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="customer-details lil-box pull-right">
            <table class="table">
                <label for="" class="origin-destination-marker">To</label>
                <tbody>
                <tr><td> <b> {{ appForm.currentInvoice.recipient.name }}</b> </td></tr>
                <tr><td> {{ appForm.currentInvoice.recipient.address }}</td></tr>
                <tr><td> {{ appForm.currentInvoice.recipient.email }}</td></tr>
                <tr><td> {{ appForm.currentInvoice.recipient.phoneNumber }}</td></tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="invoice-items-container">
        <table class="table invoice-items table-striped">
            <thead>
            <tr>
                <th class="ax-grid-action-1"></th>
                <th>Item</th>
                <th class="tright">Quantity</th>
                <th class="tright">Unit cost</th>
                <th class="tright price">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="item in appForm.currentInvoice.invoiceItems">
                <td> {{ $index + 1 }}. </td>
                <td> {{ item.description }} </td>
                <td class="tright"> {{ item.quantity }} </td>
                <td class="tright"> {{ item.unitCost }} </td>
                <td class="tright"> {{ appForm.computeLineTotal(item.quantity, item.unitCost) }} </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="summing-box">
        <div class="row">
            <div class="col-sm-3 pull-right">
                <div class="form-group">
                    <label class=""> Tax (%):</label>
                    <label class="pull-right"> {{ appForm.currentInvoice.tax }} </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3 pull-right total-box">
                <label for=""> <b>Total: </b> </label>
                <label class="pull-right">
                    <b> {{ appForm.currentInvoice.currency.symbol }} {{ appForm.currentInvoice.total }} </b>
                </label>
            </div>
        </div>
    </div>
</div>
`;

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
	
	static $inject = ['$state', '$stateParams', 'Fetcher', '$http', "$rootScope" , '$sce', "$templateCache"];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
		_fetcher: Fetcher, _http: angular.IHttpService, rootScope: angular.IRootScopeService, _sce: angular.ISCEService, _templateCache : angular.ITemplateCacheService) {
			
		super(_state, _stateParams,_fetcher, rootScope);	
		fetcher = _fetcher;
		http = _http;						
		sce = _sce;
		templateCache = _templateCache;
				
		this.currentInvoice = <IInvoice>{tax: 0, total: ""};
		this.currentInvoice.invoiceItems = [];
		
		if(!this.stateParams.id){
			fetcher.query('currencies').then((response) => {
				this.currencies = <ICurrency[]>response.data;
			});
			
			fetcher.query('recipients').then((response) => {
				this.recipients = <IRecipient[]>response.data;
			});
		}		
		
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
		
		// this.previewHtml = templateHtml;
		// this.previewHtml = sce.trustAsHtml(this.previewHtml);	
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
		// this.showPreview = true;		
		// return;
		
		let url = '/templates/invoices/preview';
		http.get(url, {cache: templateCache}).then((response) =>{
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