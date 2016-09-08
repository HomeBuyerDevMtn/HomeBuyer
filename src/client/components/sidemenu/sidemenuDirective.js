angular.module('homeBuyer')
  .directive('sideMenu', function(){

    return {
      restrict: 'E',
      templateUrl: "./views/sidemenuTmpl.html",
      controller: 'sidemenuCtrl'
    }

  }) //end sidemenu directive
