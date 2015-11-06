let tokenName = "app_token";

interface IAuthToken {
  setT(value: string):void;  
  getT(): string;
  destroyT(): void;
  putObject(key: string, value: Object): void;
  getObject(key: string): Object;
}

class AuthToken implements IAuthToken{
  
  constructor() {
  }

  setT(value: string){
    localStorage.setItem(tokenName, value);
  }

  getT(): string {
    return localStorage.getItem(tokenName);
  }
  
  putObject(key: string, value: Object) : void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getObject(key: string): Object{
    return JSON.parse(localStorage.getItem(key));
  }

  destroyT(): void {
    localStorage.removeItem(tokenName);
  }
}

AuthToken.$inject = [];
export { AuthToken , IAuthToken};
