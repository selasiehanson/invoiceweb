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
	
	findOne(resource: string, id: number | string) {
		return this.http.get(`/api/${resource}/ id`);
	}
			
	remove(resource: string, id: number) {
		return this.http.delete(`/api/${resource}/${id}`);
	}
	
	save(resource: string, args: any) {
		if(args.id) {
			return this.http.put(`/api/${resource}/${args.id}`, args);	
		}else {
			return this.http.post(`/api/${resource}`, args);
		}			
	}	
}

export { Fetcher };