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
			
	remove(resource: string, id: number) {
		return this.http.delete(`/api/${resource}`, {id: id});
	}
	
	save(resource: string, args: any) {
		if(args.id) {
			return this.http.post(`/api/${resource}`, args);	
		}else {
			return this.http.put(`/api/${resource}`, args);
		}
			
	}
	
}

export { Fetcher };