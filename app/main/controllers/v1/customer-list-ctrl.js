'use strict';
angular.module('main')
.controller('CustomerListV1Ctrl', function ($log, $scope, sync, $ionicPopup) {
  $log.log('CustomerListV1Ctrl');
  $scope.customerList = [];

  sync.get('customers', function (data) {
    $scope.customerList = data;
  });

  $scope.deleteCustomer = function (item, $index) {
    sync.destroy('customers/' + item.id, function () {
      $scope.customerList.splice($index, 1);
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Registro removido com sucesso!'
      });
    });
  };

  $log.log('Hello from your Controller: CustomerListCtrl in module main:. This is your controller:', this);
});
