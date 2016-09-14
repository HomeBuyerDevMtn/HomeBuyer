angular.module('homeBuyer')
  .directive('imgSliderDir', function($timeout) {

    return {
      restrict: 'E',
      templateUrl: './views/image-slider.html',
      controller: 'homeCtrl'
    };
  });
