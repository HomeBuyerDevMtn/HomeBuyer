angular.module('homeBuyer')
  .directive('addPictureDir', function() {

    return {
      restrict: 'E',
      templateUrl: './views/addPictureTmpl.html',
      controller: 'addPictureCtrl'
    };

  });
