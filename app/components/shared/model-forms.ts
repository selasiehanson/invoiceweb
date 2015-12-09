import { Clients } from './forms/client';
import { Recipients } from './forms/recipient';
import { Product } from './forms/product';
import { Purchase } from './forms/purchase';
import { ProductCategory } from './forms/product_category';
import { Shop } from './forms/shop';
import { Supplier } from './forms/supplier';
import { Company } from './forms/company';
import { Warehouse } from './forms/warehouse';
import { Invoice } from './forms/invoice';
import { Job }  from './forms/job';
import { SettingsProfile, SettingsCompanyDetails, SettingsCurrencies } from './forms/settings'
import { IForm, IExtendFormlyObject } from './form-interfaces';


const Forms: IForm  = {
  clients: Clients,
  products: Product,
  purchases: Purchase,
  product_categories: ProductCategory,
  warehouse: Warehouse,
  suppliers: Supplier,
  companies: Company,
  jobs: Job,
  invoices: Invoice,
  settingsProfile: SettingsProfile,
  settingsCompany: SettingsCompanyDetails,
  settingsCurrency: SettingsCurrencies
};

export { Forms };
