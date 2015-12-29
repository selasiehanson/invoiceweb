/// <reference path="../../../typings/tsd.d.ts" />

import { Fetcher } from '../../services/fetcher';
import { IAppStateParams } from '../shared/controller-interfaces';
import { Forms } from '../shared/model-forms';
import { AppFormController } from "../shared/app-form-ctrl"
let _ = require('lodash');
import S =  require('string') ;
import { Store } from '../shared/store';
import { RecordEvents} from '../shared/app-events';
import {IInvoice, ICurrency, IClient, IInvoiceItem, IInvoiceMetaData} from '../shared/model-interfaces'

let http: angular.IHttpService;
let fetcher: Fetcher;
let sce: angular.ISCEService;
let templateCache: angular.ITemplateCacheService;
let store: Store;


class InvoiceFormCtrl extends AppFormController{
	clients: Object[];
	currentInvoice: IInvoice; 
	previewInvoice: IInvoice;
	currencies: ICurrency[]; 
	invoiceUrl: string;
	previewHtml: string = '';
	showPreview = false;
	showEmail = true;	
	static $inject = ['$state', '$stateParams', 'Fetcher', '$http', "$rootScope" , '$sce', "$templateCache", 'Store'];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
		_fetcher: Fetcher, _http: angular.IHttpService, rootScope: angular.IRootScopeService, _sce: angular.ISCEService, _templateCache : angular.ITemplateCacheService, _store: Store) {
			
		super(_state, _stateParams,_fetcher, rootScope);	
		fetcher = _fetcher;
		http = _http;						
		sce = _sce;
		templateCache = _templateCache;
		store = _store;
				
		this.currentInvoice = <IInvoice>{tax: 0, total: ""};
		this.currentInvoice.invoiceItems = [];
		
		if(!this.stateParams.id){
			this.fetchLookupFields(false);
			this.generateInvoiceNumber();
		}		
		
		this.invoiceUrl = '';	
		rootScope.$on(RecordEvents.recordLoaded, (ev, invoice) => {
			this.currentInvoice  = invoice;
			this.fetchLookupFields(true);
			this.generateInvoiceNumber();
		});		
	}
	
	generateInvoiceNumber(){
		if(!this.currentInvoice.invoiceNumber){
			let invoicesMetaData = <IInvoiceMetaData>store.getObject(`${this.model}`);
			this.currentInvoice.invoiceNumber = S(invoicesMetaData.count + 1).padLeft(4, 0).toString();	
		}		
	}
	
	fetchLookupFields(isRecordLoaded: boolean){
		fetcher.query('currencies').then((response) => {
			this.currencies = <ICurrency[]>response.data;
			if(isRecordLoaded){
				this.currentInvoice.currency =  _.find(this.currencies, ((x: ICurrency) => x.id === this.currentInvoice.currencyId));	
			}
						
		});
		
		fetcher.query('clients').then((response) => {
			this.clients = <IClient[]>response.data;
			if(isRecordLoaded){
				this.currentInvoice.client = _.find(this.clients,((x: IClient) => x.id === this.currentInvoice.clientId));
			}
		});
	}
	
	addItem(){
		this.currentInvoice.invoiceItems.push(<IInvoiceItem>{});
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
		let url = `/templates/invoices/preview?invoiceId=${this.currentInvoice.id}`;
		http.get(url).then((response) =>{
			this.previewHtml = <string>response.data;						
			this.showPreview = true;	
			this.currentInvoice.total = this.computeTotal();
		});
	}
	
	save(){
		this.currentInvoice.clientId = this.currentInvoice.client.id;
		this.currentInvoice.currencyId = this.currentInvoice.currency.id;
		let data = angular.copy(this.currentInvoice);
		delete data.currency;
		delete data.client;		
		fetcher.save('invoices',data).then((res) => {
			console.log(res)
		});		
	}
	
	viewAsPdf(id: number){		
		let url =`/api/invoices/aspdf?invoiceId=${id}`;
		 http.get(url)
			.then(function (res: any) {
				
				var fileURL = 'data:application/pdf;base64,' + res.data.pdf;
				var pdfURI = sce.trustAsResourceUrl(fileURL);     
				var downloadLink = angular.element('<a></a>');
				downloadLink.attr('href', pdfURI);
				downloadLink.attr('download',  'invoice.pdf');
				downloadLink[0].click();
			})
			.finally(function () {
				//vm.action.generating = false;
			}); 
		// window.open(`http://localhost:8091/api/invoices/aspdf?invoiceId=${id}`)
		// http.get(url).then((response) =>{
			
		// });
	}
}

export { InvoiceFormCtrl };