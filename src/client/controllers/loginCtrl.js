angular.module('homeBuyer').controller('loginCtrl', function($scope, $cordovaOauth, $http, homeService){


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


  $scope.createHome = function(home) {
    var newHome = {
      list_id: 1,
      nickname: home.nickname,
      price: home.price,
      address_1: home.address1,
      address_2: home.address2,
      city: home.city,
      zip: home.zip,
      province: home.state,
      bathrooms: home.bathrooms,
      bedrooms: home.bedrooms,
      sq_feet: home.sqFootage,
      year_build: home.year,
      description: home.description,
      days_listed: home.daysListed
    }

    console.log(newHome);
    homeService.createHome(newHome).then(function(response){
      console.log(response);
    })
  }

})
