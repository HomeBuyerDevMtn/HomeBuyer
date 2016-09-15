angular.module('homeBuyer')

  .controller('listCtrl', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, homeService, $location, $ionicSideMenuDelegate, listService) {


//////////////////////////////////
////// list ctrl endpoints //////
/////////////////////////////////

//to test
var user_id = 1;
var list_id = 1;


//get all homes by list_id
$scope.getAllHomesByList = function(list_id) {
  listService.getAllHomesByList(list_id)
    .then(function(response) {
      $scope.homesInList = response;
    });
};
$scope.getAllHomesByList(list_id);



//delete home
$scope.deactivateHome = function(id, $index) {
  listService.deactivateHome(id)
    .then(function(response) {
      $scope.homesInList.splice($index, 1);
      console.log(response);
      $scope.getAllHomesByList(list_id);
    });
};

//////// to test view ///////////
// $scope.allImages = [{
//   'src' : 'img/house.jpg',
//   'price' : '195,000',
//   'score' : '2.3',
//   'bed' : '2',
//   'bath' : '4',
//   'sqft' : '2,000'
// }, {
//   'src' : 'img/house5.jpg',
//   'price' : '230,000',
//   'score' : '4.5',
//   'bed' : '3',
//   'bath' : '2.5',
//   'sqft' : '1,600'
// }, {
//   'src' : 'img/house6.jpg',
//   'price' : '687,000',
//   'score' : '3.8',
//   'bed' : '5',
//   'bath' : '10',
//   'sqft' : '800'
// }, {
//   'src' : 'img/house7.jpg',
//   'price' : '1,000,003',
//   'score' : '5',
//   'bed' : '1',
//   'bath' : '1',
//   'sqft' : '10,000'
// }
// ];


//ionic specific, don't touch
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
$scope.showAddHome = function() {
  $scope.showModal('./views/add-home-modal.html');
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

$scope.toggleLeft = function() {
  $ionicSideMenuDelegate.toggleLeft()
}

}) //end listCtrl

.service('listService', function($http) {


    //get all homes by list
    this.getAllHomesByList = function(list_id) {
      return $http.get("http://192.168.1.24:3000/lists/homes/" + list_id)
        .then(function(response) {
          console.log("in service get homes by list", response.data);
          return response.data;
        });
    };

    //delete home
    this.deactivateHome = function(home_id) {
      return $http.post("http://192.168.1.24:3000/lists/homes/deactivate/" + home_id)
        .then(function(response) {
          console.log("deleting from service", response.data);
          return response.data
        })
    }

}); //end list service
