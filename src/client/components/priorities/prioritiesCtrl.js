angular.module('homeBuyer')
  .controller('prioritiesCtrl', function($scope, prioritiesService, $state) {

  //  var currentUser = JSON.parse(localStorage.getItem('localUser'));
  //  var userid = currentUser.user_id;

    $scope.defaultPriorities = prioritiesService.getDefaultPriorities();

    //to test
    var list_id = 1;
    var user_id = 1;

    $scope.getPriorities = function() {
      prioritiesService.getPriorities(list_id, user_id)
        .then(function(response) {
          console.log("helooooo",response);
          $scope.myPriorities = response;
           if($scope.myPriorities.length > 0) {
              $scope.defaultPriorities = $scope.myPriorities;
              console.log($scope.defaultPriorities);
           }
        });
    };
    $scope.getPriorities(list_id, user_id);

    $scope.showAdd = function() {
      $scope.hideAdd = !$scope.hideAdd;
    };

    $scope.clearInput = function() {
      $scope.priority_name = "";
      $scope.priority_value = 50;
    };

    $scope.addPriority = function() {
      var newPriority = {
        user_id: 1,
        list_id: 1,
        priorities: [
          {
            priority_description: $scope.priority_name,
            priority_value: $scope.priority_value
          }
        ]
      };
       $scope.defaultPriorities.push(newPriority.priorities[0]);
      // $scope.getPriorities();

      prioritiesService.addPriority(newPriority)
        .then(function(response) {
          return response;
        });

      $scope.clearInput();
    };

    $scope.deletePriority = function(id, index) {

        console.log(id);
        prioritiesService.deletePriority(id)
          .then(function(response) {
            console.log(response);
            return response;
          })
         $scope.defaultPriorities.splice(index, 1);
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
          // return response;
        });
    };

  }) //end prioritiesCtrl

  .service('prioritiesService', function($http) {

    //default values for priorities
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
        return $http.put('http://192.168.1.24:3000/priorities', newPriorities)
          .then(function(response) {
            console.log(response);
            return response;
          });
    };

    //get priority list by user and user's list
    this.getPriorities = function(list_id, user_id) {
      return $http.get('http://192.168.1.24:3000/priorities?list_id=' + list_id + "&user_id=" + user_id)
        .then(function(response) {
          console.log(response);
          return response.data;
        });
    };

    //adding a priority to db
    this.addPriority = function(newPriority) {
      console.log("add p in service", newPriority);
      return $http.post("http://192.168.1.24:3000/priorities", newPriority)
        .then(function(response) {
          return response.data;
        });
    };

    //deleting priority from db
    this.deletePriority = function(id) {
      return $http.delete("http://192.168.1.24:3000/priorities/" + id)
        .then(function(response) {
          console.log(response);
          return response.data;
        })
    }

  }); //end service
