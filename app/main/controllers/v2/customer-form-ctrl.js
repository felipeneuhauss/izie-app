'use strict';
angular.module('main')
  .controller('CustomerFormV2Ctrl', function ($log, $scope, sync, $stateParams, $state, moment, takeAPhoto, $ionicPopup) {

    $scope.localPicture = null;
    $scope.submitted    = false;
    $scope.customer     = {
      originalBirthday: new Date(),
      picture: 'https://dummyimage.com/300x150/cccccc/444444&text=Clique+para+adicionar',
      gender: {id: 'female', name: 'Feminino'}
    };

    $scope.genders = [{id: 'female', name: 'Feminino' }, {id: 'male', name: 'Masculino'}];

    if ($stateParams.id) {
      sync.get('customers/' + $stateParams.id, function (data) {
        data.original_birthday = new Date(data.original_birthday);
        $scope.customer = data;
        $log.log('customer', $scope.customer);

        $scope.customer.picture = $scope.customer.picture ? $scope.customer.picture : 'https://dummyimage.com/300x150/cccccc/444444&text=Clique+para+adicionar';
        $scope.customer.gender = $scope.customer.gender.indexOf('Masculino') >= 0 ? $scope.genders[1] : $scope.genders[0];
        localStorage.setItem('customer', JSON.stringify($scope.customer));
      });
    }

    $scope.urlForImage = function () {
      return takeAPhoto.urlForImage($scope.localPicture, $scope.customer);
    };

    $scope.addImage = function () {
      takeAPhoto.addImage(function (pictureVo, localPicture) {
        $scope.localPicture = localPicture;
        $scope.customer.picture_id = pictureVo.id;
      });
    };

    $scope.saveCustomer = function (isValid) {
      if (!isValid) {
        $scope.submitted = true;
        return;
      }

      var payload = angular.copy($scope.customer);
      payload.birthday = moment($scope.customer['original_birthday']).format('YYYY-MM-DD');
      payload.gender = $scope.customer.gender.id;
      payload['user_id'] = 1;

      if (payload.id !== null && payload.id !== undefined) {
        sync.update('customers/' + payload.id, payload, function () {
          $ionicPopup.alert({
            title: 'Sucesso!',
            template: 'Registro salvo!'
          });
          $state.go('main.customers', {reload: true});
        }, function (errorMessage) {
          $ionicPopup.alert({
            title: 'Ops!',
            template: errorMessage
          });
        });
      } else {
        sync.store('customers', payload, function () {
          $ionicPopup.alert({
            title: 'Sucesso!',
            template: 'Registro salvo!'
          });
          $state.go('main.customers', {reload: true});
        }, function (errorMessage) {
          $ionicPopup.alert({
            title: 'Ops!',
            template: errorMessage
          });
        });
      }
    };
  });
