'use strict';

/** JS Stuff **/
require('angular');
require('angular-aria');
require('angular-animate');
require('angular-ui-router');
require('font-awesome');
require('mfbjs');
require('mfbcss');
require('angular-formly');
require('angular-sanitize');
require('angular-formly-templates-bootstrap');
require('ui-select');

require('./assets/js/libs/bootstrap-growl.js');
require('./assets/js/libs/pnotify.custom.js')
require('angular-loading-bar');
require('bs-datepicker');

//css
require("bootstrap-sass!./assets/js/bootstrap-sass-config.js");
require("./assets/css/vendor/pnotify.custom.css");
require('ui-select-css');
require('angular-loading-bar-css');
require('bs-datepicker-css');

document.write(require("./base.html"));
var app = require('./app/app');

angular.element(document).ready(function () {  
  angular.bootstrap(document, [app.app.name], {
    // strictDi: true
  });
});