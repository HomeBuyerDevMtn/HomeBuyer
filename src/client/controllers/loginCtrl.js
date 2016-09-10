angular.module('homeBuyer').controller('loginCtrl', function($scope, $cordovaOauth, $http, homeService, $ionicModal){


$scope.googleLogin = function(){

     $cordovaOauth.google("766659347642-s0ls1h1po2h618ugeb02vb02i9thf5tv.apps.googleusercontent.com", ["email","profile"]).then(function(result) {

         $scope.showProfile = false;
         $http.get("https://www.googleapis.com/plus/v1/people/me", {params: {access_token: result.access_token }})
         .then(function(res) {
          //  userService.readUserById(res).then(function(response){
          //   //  userService.registerUser(res).then(function(response){
          //   //    console.log(res);
          //   //  })
          //  })

          $scope.showProfile = true;
          $scope.details = res.data;
          $scope.token = res;

         }, function(error) {
             alert("Error: " + error);
         });

       },function(error) {
       // error
         $scope.details = 'got error';
       });
   }




})
