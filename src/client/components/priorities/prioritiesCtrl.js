angular.module('homeBuyer')
  .controller('prioritiesCtrl', function($scope, prioritiesService) {

  //  var currentUser = JSON.parse(localStorage.getItem('localUser'));
  //  var userid = currentUser.user_id;

    $scope.defaultPriorities = prioritiesService.getDefaultPriorities();



    //
    // $scope.getPriorities = function() {
    //   prioritiesService.getPriorities()
    //     .then(function(response) {
    //       console.log(response)
    //       $scope.myPriorities = response.data;
    //     });
    // }
    $scope.showAdd = function() {
      $scope.hideAdd = !$scope.hideAdd;
    };

    $scope.clearInput = function() {
      $scope.priority_name = "";
      $scope.priority_value = 50;
    };

    $scope.addPriority = function() {
      var newPriority = {
        priority_description: $scope.priority_name,
        priority_value: $scope.priority_value
      };
      $scope.defaultPriorities.push(newPriority);
      console.log($scope.defaultPriorities);
      $scope.clearInput();
    };

    $scope.setPriorities = function() {
      var newPriorities = {
        list_id: 1,
        user_id: 1,
        priorities: $scope.defaultPriorities
      };
      prioritiesService.setPriorities(newPriorities)
        .then(function(response) {
          console.log(response);
          return response;
        });
    };

  }) //end prioritiesCtrl

  .service('prioritiesService', function($http) {

    var defaultPriorities = [
      {
        priority_description: 'Safety',
        priority_value: 50
      },
      {
        priority_description: 'Commute',
        priority_value: 50
      },
      {
        priority_description: 'Schools',
        priority_value: 50
      },
      {
        priority_description: 'Yard',
        priority_value: 50
      },
      {
        priority_description: 'Neighborhood',
        priority_value: 50
      },
      {
        priority_description: 'Kitchen',
        priority_value: 50
      }
    ];

    //returning the starting priority objects to controller
    this.getDefaultPriorities = function() {
      return defaultPriorities;
    };

    //saving new priorities list set by user
    this.setPriorities = function(newPriorities) {
        console.log('from service', newPriorities);
        $http.post('http://172.19.245.69:3000/priorities', newPriorities)
          .then(function(response) {
            console.log(response);
            return response;
          });
    };
    //
    // this.getPriorities = function() {
    //   $http.get('/priorities/' + userid)
    //     .then(function(response) {
    //       console.log(response);
    //       return response;
    //     });
    // };

  }); //end service
