interface ITableHeader {
	name: string;
	field: string;
	sort?: boolean;
}

interface IModelViewConfig {
	defaultNew?: boolean;
	defaultList?: boolean;
	defaultEdit?: boolean;
}

interface ISchemaDefinition {
	headers?: Array<ITableHeader>
	views?: IModelViewConfig,
	custom?: any
}

interface ISchema {
	[key: string]: ISchemaDefinition
}

const Schema: ISchema = {
    invoices: {
		headers: [		
			{ name: 'Invoice ID', field: 'invoiceID'},
			{ name: 'Recipient', field: 'recipientName' },
			{ name: "Currency", field: 'currencyName' },
			{ name: 'Amount', field: 'total' },			
			{ name: 'Tax', field: 'tax' },
			{ name: 'Invoiced on', field: 'invoiceDate' },
			{ name: 'Valid until', field: 'dueDate'}
		],
		views: {
			defaultNew: false
		}
    },
	quotes: {
		headers: [		
			{ name: 'Quote Number', field: 'quoteNumber'},
			{ name: 'Client', field: 'recipientName' },
			{ name: "Currency", field: 'currencyName' },
			{ name: 'Amount', field: 'total' },			
			{ name: 'Tax', field: 'tax' },			
			{ name: 'Date', field: 'quoteDate' },
			{ name: 'Expiry', field: 'expiryDate' },			
		],
		views: {
			defaultNew: false
		}
    },
	currencies: {
		headers: [		
			{	name: 'Name', field: 'currencyName' },
			{	name: 'Symbol', field: 'symbol' },			
			{ 	name: 'Code', field: 'currencyCode' }			
		]
	},    
    products: {
		headers: [ 
			{ name: "Code", field: 'code' },
			{	name: 'Name', field: 'name', sort: true  },
			{	name: 'Category', field: 'category', sort: true },
			{	name: 'Selling Price', field: 'sellingPrice' },
			{	name: 'Re-Order Level', field: 'reorderLevel' },
			{	name: "Maximum Stock",	field: 'maximumStock' }
		]
    },
    clients: {
		headers: [
			{ name: "Name", field: "name" },
			{ name: "Email", field: "email" },
			{ name: "Address", field: "address" },
			{ name: "Phone Number", field: "phoneNumber" }
		]
    },
    "reports": {
		views: {
			defaultList: false
		}
    },
    // "dashboard": {
    // }
};

//todo: add views section to list that makes it describe the kind of views
// should use for the views
//by setting a view type to true indicates that we can should not use the generic
//one but rather look for a view in the apropriate folder
// { views: { useList: true, useNew: true, useShow: true, useEdit: true}}
export { Schema, ITableHeader, IModelViewConfig, ISchema, ISchemaDefinition };
