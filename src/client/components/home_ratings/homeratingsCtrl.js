angular.module('homeBuyer')
  .controller('ratingsCtrl', function($scope, ratingsService, prioritiesService, $stateParams, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $ionicPopup, $state) {

      //current user information
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var home_id = $stateParams.home_id;
      var user_id = currentUser.user_id;

//get ratings by home and user id
$scope.getRatings = (home_id, user_id) => {
  console.log(home_id, user_id)
  ratingsService.getRatings(home_id, user_id).then((response) => {
    console.log('myRatings :', response)
    $scope.myRatings = response;
  })
}
$scope.getRatings(home_id, user_id);

//edit ratings
$scope.editRatings = (myRatings) => {
  console.log(myRatings)
  console.log('ctrl myRatings', myRatings);
  let ratings = {ratings:[]};
  for (var i = 0; i < myRatings.length; i++) {
    ratings.ratings.push({id: myRatings[i].id, rating_description: myRatings[i].rating_description, rating_value: myRatings[i].rating_value})
  }
  console.log('ratings', JSON.stringify(ratings));
  ratingsService.editRatings(ratings).then((response) => {
    return response;
  })
}

//ionic side menu slide left
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true;

 $scope.toggleLeft = function() {
   $ionicSideMenuDelegate.toggleLeft()
 };

 //confirm update alert alert
 $scope.showUpdatedAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Ratings updated!',
     template: 'Ratings are officially updated 🏡 '
   });
   alertPopup.then(function(res) {
     if(res) {
      //  console.log("don't");
      console.log("this is the home id", home_id);
       $state.go('myHome', {home_id: home_id});
     }
   })
 };


}) //end ratingsCtrl



/////////////////////////
/////////SERVICE/////////
/////////////////////////

    .service('ratingsService', function($http) {
      let baseUrl = 'http://138.68.17.238/'
      // let baseUrl = 'http://192.168.1.26:3000/';
      // let baseUrl = 'http://localhost:3000/'



      //get priority list by user and user's list
      this.getRatings = function(home_id, user_id) {
        return $http.get(baseUrl + 'ratings?home_id=' + home_id + "&user_id=" + user_id)
          .then(function(response) {
            console.log(response);
            return response.data;
          });
      };

      //edit ratings
      this.editRatings = (ratings) => {
        console.log('hey dan', JSON.stringify(ratings));
        return $http({
          method: "PUT",
          url: baseUrl + 'ratings',
          data: ratings
        }).then((response)=> {
          return response.data;
        })
      }

    }); //end ratings service
