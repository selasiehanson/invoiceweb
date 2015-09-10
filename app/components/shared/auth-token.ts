let tokenName = "app_token";

interface IAuthToken {
  setT(value: string):void;  
  getT(): string;
  destroyT(): void;
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

  destroyT(): void {
    localStorage.removeItem(tokenName);
  }
}

AuthToken.$inject = [];
export { AuthToken , IAuthToken};
