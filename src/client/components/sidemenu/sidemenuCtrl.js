angular.module('homeBuyer')
  .controller('sidemenuCtrl', function($scope, $ionicSideMenuDelegate){

      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft()
      }

  }); //end sidemenuCtrl
