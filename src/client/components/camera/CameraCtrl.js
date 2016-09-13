angular.module('homeBuyer')
  .controller('cameraCtrl', function($scope, $cordovaCamera, cameraService) {


    //    var currentUser = JSON.parse(localStorage.getItem('localUser'));
    //    var userid = currentUser.user_id;
    //
    //   if(currentUser) {
    //     console.log("in camera ctrl", currentUser.user_id);
    //   }
    //  //placeholder picture
    // $scope.pictureUrl= 'http://placehold.it/300x300';
    //
    // //take picture with carmea on device
    // $scope.takePicture = function() {
    //   var options = {
    //     destinationType: Camera.DestinationType.DATA_URL,
    //     encodingType: Camera.EncodingType.JPEG,
    //   };
    //   $cordovaCamera.getPicture(options)
    //     .then(function(data) {
    //       $scope.pictureUrl = 'data:image/jpeg;base64,' + data;
    //     }, function(error) {
    //       console.log('camera error is: ', angular.toJson(data));
    //     });
    // }; // end $scope.takePicture()

    $scope.uuid;
    //upload picture to s3 and give it a guid as the file name
    $scope.uploadToS3 = function() {
      // console.log("this is the current user:", currentUser);
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

        $scope.uuid = guid() + ".jpeg";
        console.log($scope.uuid);


      cameraService.storeImage($scope.pictureUrl, $scope.uuid);

    }; //end uploadToS3

    //upload to sql db
      $scope.upload = function() {
        //home_id of 1 is only to test
        var userImage = {
          url: "http://s3-us-west-2.amazonaws.com/homebuyer-bucket/" + 4 + "/" + $scope.uuid,
          home_id: 1
        };

        console.log('clicked upload', userImage.url, userImage.home_id);
        cameraService.upload(userImage);
      };

  }) //end camera controller

  .service('cameraService', function($http) {

      //for AWS S3
      this.storeImage = function(imageData, fileName) {

      var newImage = {
        imageName: fileName,
        imageBody: imageData,
        imageExtension: 'jpeg',
        userEmail: "heathermhargreaves@gmail.com"
      }


      return $http({
        method: "POST",
        //different server for browser v. emulator, this is for android emulator
        url: "http://172.19.245.13:3000/api/newimage",
        data: newImage,
      }).then(function( response) {
        console.log("POOOOSTTTT: ", response);
      }, function(error){
        console.log('ERRRORRRR', JSON.stringify(error));
      });
    }; //end storeImage() in aws

      //to store new image in DB associated with a home_id
      // this.upload = function(userImage) {
      //   console.log('in service', userImage.home_id, userImage.url);
      //   $http.post('/images', userImage);
      // }
    }) //end service
