/// <reference path="../../../typings/tsd.d.ts" />

interface IAppStateParams extends angular.ui.IStateParamsService {
  url: string;
  id: number;
}

interface IHttpStatus{
  [key: string]: string
}

export { IAppStateParams, IHttpStatus };