'use strict';
angular.module('main')
.controller('AddressListV3Ctrl', function ($log, $scope, sync, $ionicPopup) {
  $scope.addressList = [];

  $scope.customer = JSON.parse(localStorage.getItem('customer'));

  sync.get('customers/' + $scope.customer.id + '/addresses', function (data) {
    $scope.addressList = data;
  });

  $scope.deleteAddress = function (item, $index) {
    sync.destroy('addresses/' + item.id, function () {
      $scope.addressList.splice($index, 1);
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Registro removido com sucesso!'
      });
    });
  };

  $log.log('Hello from your Controller: CustomerListCtrl in module main:. This is your controller:', this);
});
