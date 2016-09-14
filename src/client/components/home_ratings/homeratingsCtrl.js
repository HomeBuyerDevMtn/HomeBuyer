angular.module('homeBuyer')
  .controller('ratingsCtrl', function($scope, ratingsService, prioritiesService) {

    //  var currentUser = JSON.parse(localStorage.getItem('localUser'));
    //  var userid = currentUser.user_id;


      var home_id = 1;
      var user_id = 1;
      var list_id = 1;

$scope.getRatings = (home_id, user_id) => {
  console.log(home_id, user_id)
  ratingsService.getRatings(home_id, user_id).then((response) => {
    $scope.myRatings = response;
  })
}
$scope.getRatings(home_id, user_id);

$scope.editRatings = (myRatings) => {
  console.log('ctrl myRatings', myRatings);
  let ratings = {ratings:[]};
  for (var i = 0; i < myRatings.length; i++) {
    ratings.ratings.push({id: myRatings[i].id, rating_description: myRatings[i].rating_description, rating_value: myRatings[i].rating_value})
  }
  console.log('ratings', ratings);
  ratingsService.editRatings(ratings).then((response) => {
    return response;
  })
}



    }) //end ratingsCtrl



/////////////////////////
/////////SERVICE/////////
/////////////////////////

    .service('ratingsService', function($http) {
      let baseUrl = 'http://192.168.1.24:3000'



      //get priority list by user and user's list
      this.getRatings = function(home_id, user_id) {
        return $http.get('http://192.168.1.24:3000/ratings?home_id=' + home_id + "&user_id=" + user_id)
          .then(function(response) {
            console.log(response);
            return response.data;
          });
      };


      this.editRatings = (ratings) => {
        console.log('hey dan', ratings)
        return $http({
          method: "PUT",
          url: baseUrl + '/ratings',
          data: ratings
        }).then((response)=> {
          return response.data;
        })
      }


    }); //end ratings service
