'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'angularMoment',
  'ngCpfCnpj',
  'ui.utils.masks'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, Config) {

  $urlRouterProvider.otherwise('/main/customers');

  switch (Config.ENV.VERSION) {
    case 1:
      console.log('$urlRouterProvider', 1);
      $stateProvider
      // this state is placed in the <ion-nav-view> in the index.html
        .state('main', {
          url: '/main',
          abstract: true,
          templateUrl: 'main/templates/v1/menu.html',
          controller: 'MenuCtrl as menu'
        })
        .state('main.customers', {
          cache: false,
          url: '/customers',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v1/customer-list.html',
              controller: 'CustomerListV1Ctrl as ctrl'
            }
          }
        })
        .state('main.customer-form', {
          cache: false,
          url: '/customers/:id?',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v1/customer-form.html',
              controller: 'CustomerFormV1Ctrl'
            }
          }
        })
        .state('main.debug', {
          url: '/debug',
          views: {
            'pageContent': {
              templateUrl: function () {
                switch (Config.ENV.VERSION) {
                  default:
                    return 'main/templates/v1/debug.html';
                }
              },
              controller: function () {
                switch (Config.ENV.VERSION) {
                  default:
                    return 'DebugCtrl as menu';
                }
              }
            }
          }
        });
      break;
    case 2:
      $stateProvider
      // this state is placed in the <ion-nav-view> in the index.html
        .state('main', {
          url: '/main',
          abstract: true,
          templateUrl: 'main/templates/v2/menu.html',
          controller: 'MenuCtrl as menu'
        })
        .state('main.customers', {
          cache: false,
          url: '/customers',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v2/customer-list.html',
              controller: 'CustomerListV2Ctrl as ctrl'
            }
          }
        })
        .state('main.customer-form', {
          cache: false,
          url: '/customers/:id?',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v2/customer-form.html',
              controller: 'CustomerFormV2Ctrl'
            }
          }
        })
        .state('main.debug', {
          url: '/debug',
          views: {
            'pageContent': {
              templateUrl: function () {
                switch (Config.ENV.VERSION) {
                  default:
                    return 'main/templates/v2/debug.html';
                }
              },
              controller: function () {
                switch (Config.ENV.VERSION) {
                  default:
                    return 'DebugCtrl as menu';
                }
              }
            }
          }
        });
      break;
    case 3:
      $stateProvider
      // this state is placed in the <ion-nav-view> in the index.html
        .state('main', {
          url: '/main',
          abstract: true,
          templateUrl: 'main/templates/v2/menu.html',
          controller: 'MenuCtrl as menu'
        })
        .state('main.customers', {
          cache: false,
          url: '/customers',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v3/customer-list.html',
              controller: 'CustomerListV3Ctrl as ctrl'
            }
          }
        })
        .state('main.customer-form', {
          cache: false,
          url: '/customers/:id?',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v3/customer-form.html',
              controller: 'CustomerFormV3Ctrl'
            }
          }
        })
        .state('main.address-form', {
          cache: false,
          url: '/addresses/:id?',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v3/address-form.html',
              controller: 'AddressFormV3Ctrl'
            }
          }
        })
        .state('main.addresses', {
          cache: false,
          url: '/addresses',
          views: {
            'pageContent': {
              templateUrl: 'main/templates/v3/address-list.html',
              controller: 'AddressListV3Ctrl as ctrl'
            }
          }
        })
        .state('main.debug', {
          url: '/debug',
          views: {
            'pageContent': {
              templateUrl: function () {
                switch (Config.ENV.VERSION) {
                  default:
                    return 'main/templates/v2/debug.html';
                }
              },
              controller: function () {
                switch (Config.ENV.VERSION) {
                  default:
                    return 'DebugCtrl as menu';
                }
              }
            }
          }
        });
      break;
    default:
      break;
  }
});

