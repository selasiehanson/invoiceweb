/// <reference path="../../../typings/tsd.d.ts" />

interface IAppStateParams extends angular.ui.IStateParamsService {
  url: string
}

interface IHttpStatus{
  [key: string]: string
}

export { IAppStateParams, IHttpStatus };