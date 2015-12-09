/// <reference path="../../../typings/tsd.d.ts" />
import { IAppStateParams } from '../shared/controller-interfaces';
import { Fetcher } from '../../services/fetcher';
import { Forms } from '../shared/model-forms';
import { Store } from '../shared/store'
import { IUser, IUserCompany} from '../user/user';

interface ISettingsProfile {
	username?: string;
	email?: string;
}

interface ISettingsCompany {
	name?: string;
	email?: string;
	address?: string,
	phoneNumber?: string;
	website?: string
}

interface ISettingsCurrency {
	username?: string;
	email?: string;
}

interface IFileParams {
	url: string;
	data: Object;
}

interface IFileUpload {
	upload: (params: IFileParams) => {upload: angular.IPromise<any> };
}

let fetcher: Fetcher;
let store: Store;
let Upload: any;

const URLS = {
	uploadURL: 'http://localhost:8090/api/users/upload-logo'
}

class SettingsController {
	state: angular.ui.IStateService;
  	stateParams: IAppStateParams;
	file: string;
	title: string;
	
	profileForm: any;
	profileRecord: ISettingsProfile;
	profileFields: AngularFormly.IFieldConfigurationObject
	
	companyForm: any;
	companyRecord: ISettingsProfile;
	companyFields: AngularFormly.IFieldConfigurationObject
	
	currencyForm: any;
	currencyRecord: ISettingsCurrency;
	currencyFields: AngularFormly.IFieldConfigurationObject
	
	logoImage: any;
	showUploaded: boolean = true;
	
	static $inject = ['$state', '$stateParams', 'Fetcher', 'Store', 'Upload', '$scope'];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
    _fetcher: Fetcher, _store: Store, _Upload: any, scope: angular.IScope ){
		
		fetcher = _fetcher;
		store = _store;
		Upload = _Upload;
		this.state = _state;
		this.stateParams = _stateParams;
		this.profileFields = Forms['settingsProfile'].fields;
		this.companyFields = Forms['settingsCompany'].fields;
		this.currencyFields = Forms['settingsCurrency'].fields
		
		//todo: fetch settings
		this.loadDetails();	
		this.file = null;
		scope.$watch( () => { return this.file } , (newEvent: any, oldEvent: any) => {			
			if(newEvent){
				this.showUploaded = false;	
			}			
		});
		
		this.getLogo();
	}
	
	
	
	loadDetails(){
		this.companyRecord = store.getObject('userCompany');
		this.profileRecord = store.getObject('profile');		
	}
	
	getLogo(){
		fetcher.query('users/logo').then((res: any) => {
			console.log(res.data);	
			this.logoImage = res.data.logo;	
			this.showUploaded = true;		
		})
	}
	
	updateProfile() {
		
	}
	
	updateCompanyInfo(){	
		let data = angular.copy(this.companyRecord);	
		fetcher.save('users/company-details', data).then((res)=> {
			// todo: show message /tick for success in updating company data
			// console.log(res.data);
		});
	}
	
	updateCurrencies(){
		console.log('updating currencies');
	}
	
	uploadLogo(){
		this.upload(this.file);
	}
	
	upload(file: any){
		let user = <IUser> store.getObject('profile');
		Upload.upload({
			url: URLS.uploadURL,
			file: file,
			fields: {
				username: user.username				  
			}
		}).progress((evt: any) => {
				// var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				// this.log = 'progress: ' + progressPercentage + '% ' +
                //                 evt.config.data.file.name + '\n' + $scope.log;
		}).success(function (data: any, status: any, headers: any, config: any) {
			
		});
	}
	
}

export  {SettingsController };