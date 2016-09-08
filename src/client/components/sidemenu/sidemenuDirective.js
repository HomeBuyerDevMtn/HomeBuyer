angular.module('homeBuyer')
  .directive('sideMenu', function(){

    return {
      restrict: 'EA',
      templateUrl: "./views/sidemenuTmpl.html",
      controller: 'sidemenuCtrl'
    }

  }) //end sidemenu directive
