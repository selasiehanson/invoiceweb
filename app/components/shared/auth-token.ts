let tokenName = "app_token";
class AuthToken {
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
export {AuthToken};
