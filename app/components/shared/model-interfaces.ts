interface IInvoiceItem {
	id?: number
	name?: string
	description?: string
	unitCost?: number
	price?: number
	quantity?: number
}

interface IInvoice {
	id?: number;
	invoiceDate?: Date;
	dueDate?: Date;
	client?: IClient;
	currency?: ICurrency;
	clientId?: number;
	currencyId?: number;
	tax?: number;
	total?: number | string;
	invoiceItems?: IInvoiceItem[];
	notes?: string;
	invoiceNumber? : string
}

interface IInvoiceMetaData {
	count: number;	
};

interface  ICurrency{
	currencyName: string;
	currencyCode: string;
	symbol: string
	id: number
}

interface IClient {
	id?: number;
	name?: string
	email?: string
	phoneNumber?: string
	address?: string
}


export { IInvoice, ICurrency, IClient, IInvoiceItem, IInvoiceMetaData}