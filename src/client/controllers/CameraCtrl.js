angular.module('homeBuyer')
  .controller('cameraCtrl', function($scope, $cordovaCamera, $cordovaFileTransfer, dataService) {

    $scope.pictureUrl= 'http://placehold.it/300x300';

    $scope.takePicture = function() {
      console.log('here in camera');
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG
      };
      $cordovaCamera.getPicture(options)
        .then(function(data) {
          // console.log("camera data is: ", angular.toJson(data));
          $scope.pictureUrl = 'data:image/jpeg;base64,' + data;

          $scope.fileread = angular.toJson($scope.pictureUrl);

        }, function(error) {
          console.log('camera error is: ', angular.toJson(data));
        });
    };

    $scope.uploadToS3 = function() {

      console.log('Attempting to upload from click', $scope.fileread)
      dataService.storeImage($scope.fileread, 'test');
    };



  }) //end camera controller

  .service('dataService', function($http) {


      this.storeImage = function(imageData, fileName) {

      var newImage = {
        imageName: fileName,
        imageBody: imageData,
        imageExtension: 'jpeg',
        userEmail: 'heathermhargreaves@gmail.com'
      }
      console.log('Hello from service');

      $http({
        method: "POST",
        url: "/api/newimage",
        data: newImage,
      }).then(function( response) {
        console.log("POOOOSTTTT: ", response);
      }, function(error){
        console.log('ERRRORRRR', JSON.stringify(error));
      })

      // return $http.post('/api/newimage', newImage);

      }
    })
