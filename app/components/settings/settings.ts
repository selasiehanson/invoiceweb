/// <reference path="../../../typings/tsd.d.ts" />
import { IAppStateParams } from '../shared/controller-interfaces';
import { Fetcher } from '../../services/fetcher';

interface ISettings {
	
}

let fetcher: Fetcher;
class SettingsCtrl {
	state: angular.ui.IStateService;
  	stateParams: IAppStateParams;
	
	static $inject = ['$state', '$stateParams', 'Fetcher'];
	constructor(_state: angular.ui.IStateService, _stateParams: IAppStateParams, 
    _fetcher: Fetcher){
		fetcher = _fetcher;
		this.state = _state;
		this.stateParams = _stateParams;
	}
}

export  { ISettings, SettingsCtrl }