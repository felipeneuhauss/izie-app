'use strict';

describe('module: main, service: Http', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Http;
  beforeEach(inject(function (_Http_) {
    Http = _Http_;
  }));

  it('should do something', function () {
    expect(!!Http).toBe(true);
  });

});
