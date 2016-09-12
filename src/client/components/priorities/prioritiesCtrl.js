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

    $scope.setPriority = function() {
      var newPriority = {
        list_id: 1,
        user_id: 1,
        priority_description: $scope.priority_name,
        priority_value: $scope.priority_value
      };
      prioritiesService.setPriority(newPriority)
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

    //saving new priority set by user
    this.setPriority = function(newPriority) {
        console.log('from service', newPriority);
        $http.post('http://172.19.245.69:3000/priorities', newPriority)
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
