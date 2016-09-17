angular.module('homeBuyer').controller('loginCtrl', function($scope, $cordovaOauth, $http, loginService, $ionicModal, $state){



$scope.googleLogin = function(){
  console.log('suh dude');

     $cordovaOauth.google("766659347642-s0ls1h1po2h618ugeb02vb02i9thf5tv.apps.googleusercontent.com", ["email","profile"]).then(function(result) {
         $scope.showProfile = false;
         $http.get("https://www.googleapis.com/plus/v1/people/me", {params: {access_token: result.access_token }})
         .then(function(res) {
          //  userService.readUserById(res).then(function(response){
          //   //  userService.registerUser(res).then(function(response){
          //   //    console.log(res);
          //   //  })
          //  })
          console.log(res);
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
            console.log(currentUser.id);            loginService.googleLogin(currentUser)
              .then(function(response) {
                if(response.user_id) {
                  $state.go('userList')
                }
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
  // let baseUrl = 'http://localhost:3000/';
  let baseUrl = 'http://192.168.1.24:3000'
    this.googleLogin = function(currentUser) {
      return $http({
        method: 'POST',
        //change IP address to the server you are working on
        url: baseUrl + '/auth/google',
        data: currentUser
      }).then(function(response) {
        localStorage.setItem('localUser', JSON.stringify(response.data));
        console.log("this is local user in storage", localStorage.getItem('localUser'));
        return response.data;
      })

    }


}) //end loginService
