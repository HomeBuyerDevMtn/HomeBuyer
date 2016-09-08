angular.module('homeBuyer')
  .directive('cameraDir', function() {

    return {
      restrict: 'E',
      templateUrl: './views/cameraTmpl.html',
      controller: 'cameraCtrl'
    };

  }); //end camera directive
