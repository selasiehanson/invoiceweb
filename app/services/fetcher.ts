/// <reference path="../../typings/tsd.d.ts" />

class Fetcher {
	http: angular.IHttpService;
	static $inject = ['$http'];
	constructor(_http: angular.IHttpService) {
		this.http = _http;
	}
	
	query(resource: string) {
		return this.http.get(`/api/${resource}`);
	}
	
}

export { Fetcher };