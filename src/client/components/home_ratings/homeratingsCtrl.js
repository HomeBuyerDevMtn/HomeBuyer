angular.module('homeBuyer')
  .controller('ratingsCtrl', function($scope, ratingsService, prioritiesService) {

    //  var currentUser = JSON.parse(localStorage.getItem('localUser'));
    //  var userid = currentUser.user_id;


      //to test
      var home_id = 1;
      var user_id = 1;
      var list_id = 1;

      //get user's priorities
      $scope.myRatings = [];
      console.log($scope.myRatings);
      $scope.setPrioritiesAsRatings = function() {
        prioritiesService.getPriorities(list_id, user_id)
          .then(function(response) {
            $scope.myPriorities = response;
            console.log('service response',response)

            for (var i = 0; i < $scope.myPriorities.length; i++) {

              var ratingObj = {
                // home_id: home_id,
                id: $scope.myPriorities[i].id,
                rating_description: $scope.myPriorities[i].priority_description,
                rating_value: 50
              };
              console.log('ratingObj', ratingObj);
              $scope.myRatings.push(ratingObj);
            }
          });
      };
      console.log('myRatings', $scope.myRatings);

      $scope.setPrioritiesAsRatings();

      $scope.setRatings = function() {
        var newRatings = {
          home_id: 1,
          user_id: 1,
          ratings: $scope.myRatings
        };
        console.log('from ctrl', newRatings);
        ratingsService.setRatings(newRatings)
          .then(function(response) {
            // console.log(response);
            return response;
          });
      };
      $scope.setRatings();

      // $scope.getRatings= function() {
      //   ratingsService.getRatings(home_id, user_id)
      //     .then(function(response) {
      //       console.log("helooooo",response);
      //       $scope.myRatings = response;
      //     });
      // };
      // $scope.getRatings(home_id, user_id);


      $scope.setRating = function() {
        var newRatings = {
          home_id: 1,
          user_id: 1,
          priorities: $scope.myRatings
        };
        ratingsService.setRating(newRating)
          .then(function(response) {
            // console.log(response);
            // return response;
          });
      };

    }) //end ratingsCtrl

    .service('ratingsService', function($http) {


      //saving new priorities list set by user
      this.setRatings = function(newRatings) {

          console.log('from service', newRatings);

          return $http.post('http://192.168.1.24:3000/ratings', newRatings)
            .then(function(response) {
              // console.log(response);
              return response;
            });
      };

      //get priority list by user and user's list
      this.getRatings = function(home_id, user_id) {
        return $http.get('http://192.168.1.24:3000/ratings?home_id=' + home_id + "&user_id=" + user_id)
          .then(function(response) {
            // console.log(response);
            return response.data;
          });
      };


    }); //end ratings service
