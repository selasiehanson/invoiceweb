let tokenName = "app_token";

interface ILocalStore {
  setToken(value: string):void;  
  getToken(): string;
  destroyToken(): void;
  putObject(key: string, value: Object): void;
  getObject(key: string): Object;
}

class Store implements ILocalStore{
  
  constructor() {
  }

  setToken(value: string){
    localStorage.setItem(tokenName, value);
  }

  getToken(): string {
    return localStorage.getItem(tokenName);
  }
  
  putObject(key: string, value: Object) : void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getObject(key: string): Object{
    return JSON.parse(localStorage.getItem(key));
  }

  destroyToken(): void {
    localStorage.removeItem(tokenName);
  }
  
  destroyAll(): void {
    localStorage.clear();
  }
}

Store.$inject = [];
export { Store , ILocalStore};
