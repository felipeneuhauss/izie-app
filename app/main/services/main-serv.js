'use strict';
angular.module('main')
.service('Main', function ($log, $timeout) {

  $log.log('Hello from your Service: Main in module main');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah this was changed';

    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

}).factory('sync', function ($http, Config, $ionicLoading, $log, $ionicPopup) {
  return {
    save: function (url, vo, callback, storeErrorCallback) {
      $ionicLoading.show();
      if (vo.id !== null && vo.id !== undefined) {
        return $http.patch(Config.ENV.SERVER_URL + url + '/' + vo.id, vo).then(function (response) {
          $ionicLoading.hide();
          callback(response.data);
          return response;
        }, function errorCallback (response) {
          $log.log(response.data, response);
          $ionicLoading.hide();
          var errorMessage = '<ul>';
          for (var key in response.data) {
            if (response.data.hasOwnProperty(key)) {
              if (response.data[key] instanceof Array) {
                errorMessage += '<li>' + response.data[key][0] + '</li>';
              }
            }
          }
          errorMessage += '</ul>';
          if (storeErrorCallback) {
            storeErrorCallback(errorMessage);
          } else {
            $ionicPopup.alert({
              title: 'Ops!',
              template: errorMessage
            });
          }
          return response;
        });
      } else {
        vo.id = null;
        return $http.post(Config.ENV.SERVER_URL + url, vo).then(function (response) {
          $log.log('POST /' + url, vo, response);
          $ionicLoading.hide();
          callback(response.data);
          return response;
        }, function errorCallback (response) {
          $log.log(response.data, response);
          $ionicLoading.hide();
          var errorMessage = '<ul>';
          for (var key in response.data) {
            if (response.data.hasOwnProperty(key)) {
              if (response.data[key] instanceof Array) {
                errorMessage += '<li>' + response.data[key][0] + '</li>';
              }
            }
          }
          errorMessage += '</ul>';
          if (storeErrorCallback) {
            storeErrorCallback(errorMessage);
          } else {
            $ionicPopup.alert({
              title: 'Ops!',
              template: errorMessage
            });
          }
          return response;
        });
      }
    },
    store: function (url, vo, callback, storeErrorCallback) {
      $ionicLoading.show();
      $log.log('POST /' + url, vo);
      return $http.post(Config.ENV.SERVER_URL + url, vo).then(function (response) {
        $log.log('POST /' + url, vo, response);
        $ionicLoading.hide();
        callback(response.data);
        return response;
      }, function errorCallback (response) {
        $log.log(response.data, response);
        $ionicLoading.hide();
        var errorMessage = '<ul>';
        for (var key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            if (response.data[key] instanceof Array) {
              errorMessage += '<li>' + response.data[key][0] + '</li>';
            }
          }
        }
        errorMessage += '</ul>';
        if (storeErrorCallback) {
          storeErrorCallback(errorMessage);
        } else {
          $ionicPopup.alert({
            title: 'Ops!',
            template: errorMessage
          });
        }
        return response;
      });
    },
    update: function (url, vo, callback) {
      $log.log('PATCH /' + url, vo);
      $ionicLoading.show();
      return $http.patch(Config.ENV.SERVER_URL + url, vo).then(function (response) {
        $ionicLoading.hide();
        callback(response.data);
        return response;
      });
    },
    get: function (url, callback) {
      $ionicLoading.show();
      return $http.get(Config.ENV.SERVER_URL + url).then(function (response) {
        $log.log('GET /' + url, response);
        $ionicLoading.hide();
        callback(response.data);
        return response;
      });
    },

    destroy: function (url, callback) {
      return $http.delete(Config.ENV.SERVER_URL + url).then(function (response) {
        callback(response.data);
        return response;
      });
    }
  };
}).run(function (Config, $rootScope) {
  $rootScope.version = Config.ENV.VERSION;
}).factory('takeAPhoto', function ($cordovaCamera, $cordovaFileTransfer, Config, $ionicLoading, $ionicPopup, $log) {

  return {
    addImage: function (callback) {

      var localPicture;
      // 2
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions
      };

      // 3
      return $cordovaCamera.getPicture(options).then(function (imageData) {

        // 4
        onImageSuccess(imageData);

        function onImageSuccess (fileURI) {
          createFileEntry(fileURI);
        }

        function createFileEntry (fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        // 5
        function copyFile (fileEntry) {
          var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          var newName = makeid() + name;

          return window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
            fileEntry.copyTo(
                fileSystem2,
                newName,
                onCopySuccess,
                fail
              );
          },
            fail);
        }

        var uploadImage = function (imageUrl) {

          // Destination URL
          var url = Config.ENV.SERVER_URL;

          // File for Upload
          var filename = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          imageUrl = cordova.file.dataDirectory + filename;

          var options = {
            fileKey: 'file',
            fileName: filename,
            chunkedMode: false,
            httpMethod: 'POST',
            mimeType: 'multipart/form-data',
            params: {'fileName': filename}
          };

          $ionicLoading.show();
          $cordovaFileTransfer.upload(url + 'pictures', imageUrl, options).then(function (result) {
            callback(result.response, localPicture);
          }, function (err) {
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Foto não foi salva!' + JSON.stringify(err)
            });
          });
        };

        // 6
        function onCopySuccess (entry) {
          localPicture = entry.nativeURL;
          return uploadImage(localPicture);
        }

        function fail (error) {
          $log.log('fail: ' + error.code);
        }

        function makeid () {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }

      }, function (err) {
        $log.log(err);
      });
    },
    urlForImage: function (localPicture, object) {
      if (localPicture === undefined || localPicture === null) {
        return object.picture;
      }
      var name = localPicture.substr(localPicture.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      return trueOrigin;
    }
  };
});
