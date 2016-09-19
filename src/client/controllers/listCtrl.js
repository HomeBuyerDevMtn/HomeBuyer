angular.module('homeBuyer')

  .controller('listCtrl', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, homeService, $location, $ionicSideMenuDelegate, listService, $stateParams, $ionicPopup) {

console.log(homeService)
//////////////////////////////////
////// list ctrl endpoints //////
/////////////////////////////////

//current info on user and list id
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let user_id = currentUser.user_id;
let list_id = Number($stateParams.list_id);

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

//add home
$scope.createHome = function(home) {
  var newHome = {
    list_id: list_id,
    user_id: user_id,
    nickname: home.nickname,
    price: home.price,
    address_1: home.address1,
    address_2: home.address2,
    city: home.city,
    zip: home.zip,
    province: home.state,
    bathrooms: home.bathrooms,
    bedrooms: home.bedrooms,
    sq_feet: home.sqFootage,
    year_build: home.year,
    description: home.description,
    days_listed: home.daysListed,

  }

  console.log(newHome);
  listService.createHome(newHome).then(function(response){
    console.log(response);
    // $location.path('myHome');
    $scope.getAllHomesByList(list_id);
  })
}


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

// modal to pop up and edit current home
$scope.showEditHome = function($index) {
  $scope.selectedIndex = $index;
  $scope.homeToEdit = $scope.homesInList[$scope.selectedIndex];
  $scope.saveEditedHome = function() {
    // console.log($scope.homesInList[selectedIndex])
    listService.saveEditedHome($scope.homeToEdit)
      .then(function(response) {
        console.log(response);
      })
  }
  $scope.showModal('./views/editHome.html');
};

$scope.showAddHome = function(list_id) {
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
};



// Close the modal
$scope.closeModal = function() {
  $scope.modal.hide();
  $scope.modal.remove()
};

$scope.toggleLeft = function() {
  $ionicSideMenuDelegate.toggleLeft();
};

//confirm alert for updating home
$scope.showAlert = function() {
  var alertPopup = $ionicPopup.alert({
    title: 'Home updated!',
    template: 'Changes are officially updated 🏡'
  });
};

//show newly created home alert //confirm update alert alert
 $scope.showCreatedAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Home created!',
     template: 'New home officially created 🏡 '
   });
  //  alertPopup.then(function(res) {
    //  if(res) {
      //  console.log("don't");
      // console.log("this is the home id", home_id);
      //  $state.go('myHome', {home_id: home_id});
    //  }
  //  });
 };


}) //end listCtrl

.service('listService', function($http) {
let baseUrl = 'http://localhost:3000/';
// let baseUrl = 'http://192.168.1.24:3000';

    //get all homes by list
    this.getAllHomesByList = function(list_id) {
      return $http.get(baseUrl + "lists/homes/" + list_id)
        .then(function(response) {
          console.log("in service get homes by list", response.data);
          return response.data;
        });
    };

    //delete home
    this.deactivateHome = function(home_id) {
      return $http.post(baseUrl + "/lists/homes/deactivate/" + home_id)
        .then(function(response) {
          console.log("deleting from service", response.data);
          return response.data
        })
    }

    //edit home
    this.saveEditedHome = function(home) {
      return $http.put(baseUrl + "/lists/homes/", home)
        .then(function(response) {
          console.log('saving edited home from service', response.data);
          return response.data
        });
    };

    // add home
    this.createHome = function(home){
      console.log(home);
      return $http({
        method: 'POST',
        url: baseUrl + '/lists/homes',
        data: home
      })
    }




}); //end list service
