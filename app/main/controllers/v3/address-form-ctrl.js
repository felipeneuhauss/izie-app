'use strict';
angular.module('main')
  .controller('AddressFormV3Ctrl', function ($log, $scope, sync, $stateParams, $state, moment, takeAPhoto, $ionicPopup) {

    $scope.localPicture = null;
    $scope.submitted    = false;
    $scope.address      = {};
    $scope.customer     = JSON.parse(localStorage.getItem('customer'));
    $scope.states       = [];
    $scope.cities       = [];

    $scope.getStates = function () {
      sync.get('states', function (data) {
        $scope.states = data;
      });
    };

    $scope.getStates();

    $scope.getCities = function (stateId, callback) {
      sync.get('states/' + stateId + '/cities', function (data) {
        $scope.cities = data;
        callback();
      });
    };

    if ($stateParams.id) {
      sync.get('addresses/' + $stateParams.id, function (data) {
        $scope.address = data;

        $scope.address.state = $scope.states.find( function (state) {
          if (state.id === $scope.address.state_id) {
            return state;
          }
        });

        $scope.getCities($scope.address.state_id, function () {
          $scope.address.city = $scope.cities.find( function (city) {
            if (city.id === $scope.address.city_id) {
              return city;
            }
          });
        });

        localStorage.setItem('address', JSON.stringify($scope.customer));
      });
    }

    $scope.saveAddress = function (isValid) {
      if (!isValid) {
        $scope.submitted = true;
        return;
      }

      var payload = angular.copy($scope.address);
      payload['customer_id'] = $scope.customer.id;
      payload.city_id = $scope.address.city.id;

      sync.save('addresses', payload, function () {
        $ionicPopup.alert({
          title: 'Sucesso!',
          template: 'Registro salvo!'
        });
        $state.go('main.addresses', {reload: true});
      }, function (errorMessage) {
        $ionicPopup.alert({
          title: 'Ops!',
          template: errorMessage
        });
      });
    };
  });
