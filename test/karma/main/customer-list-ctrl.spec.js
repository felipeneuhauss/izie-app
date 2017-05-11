'use strict';

describe('module: main, controller: CustomerListCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var CustomerListCtrl;
  beforeEach(inject(function ($controller) {
    CustomerListCtrl = $controller('CustomerListCtrl');
  }));

  it('should do something', function () {
    expect(!!CustomerListCtrl).toBe(true);
  });

});
