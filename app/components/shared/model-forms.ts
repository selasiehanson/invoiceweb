import {Clients} from './forms/client';
import {Product} from './forms/product';
import {Purchase} from './forms/purchase';
import {ProductCategory} from './forms/product_category';
import {Shop} from './forms/shop';
import {Supplier} from './forms/supplier';
import {Company} from './forms/company';
import {Warehouse} from './forms/warehouse';
import { Job }  from './forms/job';
import { IForm, IExtendFormlyObject } from './form-interfaces';


const Forms: IForm  = {
  clients: Clients,
  products: Product,
  purchases: Purchase,
  product_categories: ProductCategory,
  warehouse: Warehouse,
  suppliers: Supplier,
  companies: Company,
  jobs: Job
};

export { Forms };
