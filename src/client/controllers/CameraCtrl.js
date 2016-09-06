angular.module('homeBuyer')
  .controller('cameraCtrl', function($scope, $cordovaCamera, CameraService) {

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

    // $scope.uploadToS3 = function() {
    //
    //   console.log('Attempting to upload from click', $scope.fileread)
    //   dataService.storeImage($scope.fileread, 'test');
    // };

    //upload to sql db
    $scope.upload = function() {
      //home_id to test
      var newImage = {
        url: $scope.pictureUrl,
        home_id: 4
      }
      console.log('clicked upload', newImage.url, newImage.home_id);

      dataService.upload(newImage);
    };


  }) //end camera controller

  .service('cameraService', function($http) {

      //for AWS S3
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
        url: "http://localhost:3000/api/newimage",
        data: newImage,
      }).then(function( response) {
        console.log("POOOOSTTTT: ", response);
      }, function(error){
        console.log('ERRRORRRR', JSON.stringify(error));
      })

      // return $http.post('/api/newimage', newImage);

      }

      //to store new image in DB associated with a home_id
      this.upload = function(newImage) {

        console.log('in service', newImage.home_id, newImage.url);
        $http.post('/images', newImage);
      }
    }) //end service
