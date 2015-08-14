"use strict";

let _injector;
let _q;
let _msgBox;

function buildMessage(res) {
  if (res.data.success) {
    if (res.data.message) return res.data.message;
    return (res.config.method === "DELETE") ? "Record deleted successfully." : "Record saved successfully.";
  } else {
    return res.data.message || "Error in performing operation. Check system logs for more details";
  }
}

class AuthInterceptor {

  constructor(q, injector, MsgBox) {
    _injector = injector;
    _q = q;
    _msgBox = MsgBox;
  }

  request(config) {
    var AuthToken = _injector.get("AuthToken");
    var token = AuthToken.getT();
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config || _q.when(config);
  }

  response(res, req) {
    if (res.status === 200 && res.config.url.startsWith("/api")) {
      var message = buildMessage(res);
      if (res.headers()['content-type'] === 'application/json') {
        _msgBox.success(message);
      }
    }
    return res || _q.when(res);
  }

  requestError(errorRequest) {
    return _q.reject(errorRequest);
  }

  responseError(response) {
    var AuthEvents = _injector.get('AuthEvents');
    var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/singin'));
    if (!matchesAuthenticatePath) {
      _injector.get('$rootScope').$broadcast({
        401: AuthEvents.notAuthenticated,
        403: AuthEvents.notAuthorized,
        419: AuthEvents.sessionTimeout
      }[response.status], response);      
      _msgBox.error("Request " + response.statusText);
    } else {      
      _msgBox.error(response.data.message || response.statusText);
    }
    return _q.reject(response);
  }
}

AuthInterceptor.$inject = ['$q', '$injector', 'MsgBox'];

export {
  AuthInterceptor
};
