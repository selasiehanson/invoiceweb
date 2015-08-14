interface INavRoute {
  [key:string]:string;  
}

let routes: INavRoute;

class RouteFinder{

  constructor(){
    routes = {};
  }

  put(key: string, name: string): void{
    
    routes[key] = name;
  }

  getRoute(key: string): string{
    //strip off the first hash
    if(key[0] === '#') {
      key = key.substring(1);
    }
    return routes[key];
  }
}

export { RouteFinder };
