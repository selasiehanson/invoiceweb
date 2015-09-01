/// <reference path="../../../typings/tsd.d.ts" />

let inflection  = require('inflection');

class MsgBox {
  
  static show(message: string, status: string) {            
    new PNotify({
        title: inflection.titleize(status), 
        text: message,
        type: status,
        // icon: "fa fa-bars",
        delay: 3000,
        history: false,
        stack: false
    });
    console.log(status);
  }

  static success(message: string) {
    this.show(message, 'success');
  }

  static error(message: string) {
    this.show(message, 'error'); //same as danger
  }

  static info(message: string) {
    this.show(message, 'info'); //same as neutral
  }

  static warning(message: string) {
    this.show(message, 'warning');
  }

}
export { MsgBox };
