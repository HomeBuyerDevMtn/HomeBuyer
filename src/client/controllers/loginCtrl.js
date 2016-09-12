angular.module('homeBuyer').controller('loginCtrl', function($scope, $cordovaOauth, $http, loginService, $ionicModal){



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

////////////////////////////
/// storing user's token ///
////////////////////////////
          var currentUser = {
            name: res.data.displayName,
            email: res.data.emails[0].value,
            id: res.data.id
          };

          $scope.googleLogin = function(currentUser) {
            console.log("in login ctrl");
            loginService.googleLogin(currentUser)
              .then(function(response) {
                console.log(JSON.stringify(response.data));
                return response;
              });
          };
          $scope.googleLogin(currentUser);

         }, function(error) {
             alert("Error: " + error);
         });

       },function(error) {
       // error
         $scope.details = 'got error';
       });
   }
}) // end loginCtrl

.service('loginService', function($http) {
    this.googleLogin = function(currentUser) {
      return $http({
        method: 'POST',
        //change IP address to the server you are working on
        url: 'http://172.19.245.68:3000/auth/google',
        data: currentUser
      }).then(function(response) {
        console.log("this is a response from service", JSON.stringify(response));
        localStorage.setItem('currentUser', JSON.stringify(response));
        return response;
      })

    }


}) //end loginService
