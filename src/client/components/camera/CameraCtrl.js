angular.module('homeBuyer')
  .controller('cameraCtrl', function($scope, $cordovaCamera, cameraService) {

    $scope.pictureUrl= 'http://placehold.it/300x300';

    $scope.takePicture = function() {
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
      };
      $cordovaCamera.getPicture(options)
        .then(function(data) {
          $scope.pictureUrl = 'data:image/jpeg;base64,' + data;
          $scope.fileread = angular.toJson($scope.pictureUrl);
        }, function(error) {
          console.log('camera error is: ', angular.toJson(data));
        });
    }; // end $scope.takePicture()

    $scope.uploadToS3 = function() {
      console.log('Attempting to upload from click', $scope.pictureUrl)
      //guid to generate random string for file name
      function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }

        var uuid = guid() + ".jpeg";
        console.log(uuid);


      cameraService.storeImage($scope.pictureUrl, uuid);


      $scope.upload = function() {
        //home_id of 4 is only to test
        var newImage = {
          url: "http://s3-us-west-2.amazonaws.com/homebuyer-bucket/" + 4 + "/" + uuid,
          home_id: 4
        };

        console.log('clicked upload', newImage.url, newImage.home_id);

        cameraService.upload(newImage);
      };
    }; //end uploadToS3

    //upload to sql db



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


      return $http({
        method: "POST",
        //different server for browser v. emulator, this is for android emulator
        url: "http://192.168.1.49:3000/api/newimage",
        data: newImage,
      }).then(function( response) {
        console.log("POOOOSTTTT: ", response);
      }, function(error){
        console.log('ERRRORRRR', JSON.stringify(error));
      })

      // return $http.post('/api/newimage', newImage);

    } //end storeImage() in aws

      //to store new image in DB associated with a home_id
      this.upload = function(newImage) {



        console.log('in service', newImage.home_id, newImage.url);
        $http.post('/images', newImage);
      }
    }) //end service
