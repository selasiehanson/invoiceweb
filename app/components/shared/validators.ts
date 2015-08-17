interface IValidation {
  [key: string]: {[key2: string]: any}
}

const Validators: IValidation = {
  sales: {
  },
  products: {
    name: '*',
    reorderLevel: '* | int',
    sellingPrice: '*',
    maximumStock: '*'
  },
  clients: {
    name: '*',
    email: '*|/^\\S+@\\S+$/',
    contactNumber: '*',
    address: '*'
  }
};

export { Validators };
