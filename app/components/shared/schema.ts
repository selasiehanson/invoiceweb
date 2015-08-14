interface ITableHeader {
	name: string;
	field: string;
	sort?: boolean;
}

interface ISchema {
	[key: string]: { 
		headers?: Array<ITableHeader>
		views?: any,
		custom?: any
	};
}

const Schema: ISchema = {
    clients: {
		headers: [
			{
				name: 'Name',
				field: 'name',
				sort: true
			},
			{
				name: 'Email',
				field: 'email',
				sort: true,
			},
			{
				name: 'Address',
				field: 'address'
			},
			{
				name: 'Contact',
				field: 'contactNumber'
			}
		],
		// custom: {
		// 	name: 'bold'
		// },
		// views: {
		// 	defaultNew: false
		// }
    },
    sales: {
		headers: [
			{
				name: 'Name',
				field: 'name',
				sort: true
			},
			{
				name: 'Email',
				field: 'email',
				sort: true,
			},
			{
				name: 'Address',
				field: 'address'
			},
			{
				name: 'Contact',
				field: 'contactNumber'
			}
		],
		custom: {
			name: 'bold'
		}
    },
    products: {
		headers: [
			{
				name: "Code",
				field: 'code'
			},
			{
				name: 'Name',
				field: 'name',
				sort: true
			},
			{
				name: 'Category',
				field: 'category',
				sort: true
			},
			{
				name: 'Selling Price',
				field: 'sellingPrice'
			},
			{
				name: 'Re-Order Level',
				field: 'reorderLevel'
			},
			{
				name: "Maximum Stock",
				field: 'maximumStock'
			}
		]
    },
    companies: {
		headers: [
			{ name: "Name", field: "name" },
			{ name: "Contact Person", field: "contactPerson" },
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
export { Schema, ITableHeader };
