angular.module('homeBuyer')
  .controller('prioritiesCtrl', function($scope) {

    $scope.safetyNumber = 50;
    $scope.commuteNumber = 50;
    $scope.schoolNumber = 50;
    $scope.yardNumber = 50;
    $scope.neighborhoodNumber = 50;
    $scope.kitchenNumber = 50;

    $scope.setPriorities = function() {
      
    }


  }) //end prioritiesCtrl

  .service('prioritiesService', function($http) {

    this.setPriorities = function(user_id, list_id, neighborhoodNumber, ) {

    }

  })
