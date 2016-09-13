angular.module('homeBuyer')

  .controller('listCtrl', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, homeService, $location) {


$scope.poo = function() {
  console.log("hello there")
}

$scope.allImages = [{
  'src' : 'img/house.jpg',
  'price' : '195,000',
  'score' : '2.3',
  'bed' : '2',
  'bath' : '4',
  'sqft' : '2,000'
}, {
  'src' : 'img/house5.jpg',
  'price' : '230,000',
  'score' : '4.5',
  'bed' : '3',
  'bath' : '2.5',
  'sqft' : '1,600'
}, {
  'src' : 'img/house6.jpg',
  'price' : '687,000',
  'score' : '3.8',
  'bed' : '5',
  'bath' : '10',
  'sqft' : '800'
}, {
  'src' : 'img/house7.jpg',
  'price' : '1,000,003',
  'score' : '5',
  'bed' : '1',
  'bath' : '1',
  'sqft' : '10,000'
}
];

$scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true;

$scope.showImages = function(index) {
  $scope.activeSlide = index;
  $scope.showModal('./views/image-modal.html');
}

$scope.showPriorities = function() {
  $scope.showModal('./views/prioritiesTempl.html');
}

$scope.showEditHome = function() {
  $scope.showModal('./views/editHome.html');
}

$scope.showModal = function(templateUrl) {
  $ionicModal.fromTemplateUrl(templateUrl, {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}

// Close the modal
$scope.closeModal = function() {
  $scope.modal.hide();
  $scope.modal.remove()
};
});
