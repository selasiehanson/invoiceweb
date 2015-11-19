/// <reference path="../../../typings/tsd.d.ts" />
import { IAppStateParams } from '../shared/controller-interfaces';
import { Fetcher } from '../../services/fetcher';
import { Forms } from '../shared/model-forms';
import { AuthToken } from '../shared/auth-token'
import { IUser, IUserCompany} from '../user/user';


interface ISettingsProfile {
	username?: string;
	email?: string;
}

let fetcher: Fetcher;
let authToken: AuthToken;

class SettingsController {
	state: angular.ui.IStateService;
  	stateParams: IAppStateParams;
	title: string;
	profileForm: any;
	profileRecord: ISettingsProfile;
	profileFields: AngularFormly.IFieldConfigurationObject
	companyForm: any;
	companyRecord: ISettingsProfile;
	companyFields: AngularFormly.IFieldConfigurationObject
	
	static $inject = ['$state', '$stateParams', 'Fetcher', 'AuthToken'];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
    _fetcher: Fetcher, _authToken: AuthToken ){
		
		fetcher = _fetcher;
		authToken = _authToken;
		this.state = _state;
		this.stateParams = _stateParams;
		this.profileFields = Forms['settingsProfile'].fields;
		this.companyFields = Forms['settingsCompany'].fields;
		
		//todo: fetch settings	
		this.loadDetails();	
	}
	
	loadDetails(){
		this.companyRecord = authToken.getObject('userCompany');
		this.profileRecord = authToken.getObject('profile');
		
	}
	
	updateProfile() {
		
	}
	
	updateCompanyInfo(){	
		let data = angular.copy(this.companyRecord);	
		fetcher.save('users/company-details', data).then((res)=> {
			console.log(res.data);
		});
	}
	
}

export  {SettingsController };