/// <reference path="../../../typings/tsd.d.ts" />

let inflection  = require('inflection');

class MsgBox {
  constructor() {

  }

  show(message: string, status: string) {            
    new PNotify({
        title: inflection.titleize(status), 
        text: message,
        type: status,
        // icon: "fa fa-bars",
        delay: 20000,
        history: false,
        stack: false
    });
    console.log(status);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error'); //same as danger
  }

  info(message: string) {
    this.show(message, 'info'); //same as neutral
  }

  warning(message: string) {
    this.show(message, 'Warning');
  }

}
export { MsgBox };
