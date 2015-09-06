/// <reference path="../../../typings/tsd.d.ts" />

interface IAppStateParams extends angular.ui.IStateParamsService {
  url: string;
  id: number;
}

interface IHttpStatus{
  [key: string]: string
}

interface IModelEventArgs {
  id: number;
  model: string
}

export { IAppStateParams, IHttpStatus , IModelEventArgs};