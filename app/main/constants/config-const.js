'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'VERSION': 1,
    'SERVER_URL': 'https://izie-api.herokuapp.com/api/v1/',
    'SOME_OTHER_URL': '/postman-proxy'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});