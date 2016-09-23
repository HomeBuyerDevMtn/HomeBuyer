angular.module('homeBuyer')


  .controller('listCtrl', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, homeService, $location, $ionicSideMenuDelegate, listService, $stateParams, $ionicPopup, $rootScope, $state, prioritiesService, ratingsService) {


//////////////////////////////////
////// list ctrl endpoints //////
/////////////////////////////////

//current info on user and list id
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let user_id = currentUser.user_id;
let list_id = Number($stateParams.list_id);
$scope.listId = list_id;
let home_id = $stateParams.home_id;
$scope.list_name = $stateParams.list_name;

//get all homes by list_id
$scope.getAllHomesByList = function(list_id) {
  listService.getAllHomesByList(list_id)
    .then(function(response) {
      $scope.homesInList = response;
    });
    // $scope.getScoresForAllHomes($scope.homesInList);
};
$scope.getAllHomesByList(list_id);


//delete home
$scope.deactivateHome = function(id, $index) {
  listService.deactivateHome(id)
    .then(function(response) {
      $scope.homesInList.splice($index, 1);
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
  };
  listService.createHome(newHome).then(function(response){

    console.log('list service create home response', JSON.stringify(response));
    // $location.path('myHome');
    if(response.data.status === 200) {
      $scope.showCreatedAlert();
      $scope.getAllHomesByList(list_id);
      $scope.createHome_homeId = response.data.home_id;
    }

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
        console.log("hello form save edited home funciton", JSON.stringify(response));
        $scope.currentHome = response;
      });
  };
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
  $scope.modal.remove();
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
   alertPopup.then(function(res) {
     if(res) {
      console.log("this is the home id", home_id);
       $state.go('myHome', {home_id: $scope.createHome_homeId});
       $scope.closeModal();
     }
   });
 };

 //////////////////////////////////
 //////// HOME SCORING ////////////
 //////////////////////////////////

// for entire array of homes
$scope.getScoresForAllHomes = function(arr) {
for (var i = 0; i < arr.length; i++) {
  //get ratings in home by home id
  $scope.getRatings = function(home_id, user_id) {
    ratingsService.getRatings(home_id, user_id)
      .then(function(response) {
        // console.log("this is ratings for", home_id, user_id, JSON.stringify(response));
        $scope.rating_values = []
        $scope.priority_ids = []

        response.forEach(function(item, index) {
          $scope.rating_values.push(item.rating_value);
          $scope.priority_ids.push(item.priority_id)
        })
      });
  };
  $scope.getRatings(home_id, user_id);

  //get priorities for home by list_id
  $scope.getPriorities = function(list_id, user_id) {
    prioritiesService.getPriorities(list_id, user_id)
      .then(function(response) {
        $scope.priority_values = [];

        response.forEach(function(item, index) {
          $scope.priority_values.push(item.priority_value)
        })

        $scope.getHouseScore = function(arr1, arr2) {
            var total = 0;
            for (var i = 0; i < arr1.length; i++) {
              total += ((arr1[i] / 100) * (arr2[i] / 100));
            };
            $scope.currentHomeScore = total * 100;
            console.log("home score", JSON.stringify($scope.currentHomeScore));
        };
        $scope.getHouseScore($scope.priority_values, $scope.rating_values);
      });
  };
  $scope.getPriorities(list_id, user_id);

  //push score as a property to array of home objects homescore: currentHomeScore
  arr.push({homescore: $scope.currentHomeScore})
  console.log(JSON.stringify($scope.currentHomeScore));
  };
};


}) //end listCtrl


.service('listService', function($http, $rootScope) {
// let baseUrl = 'http://localhost:3000/';
let baseUrl = 'http://138.68.17.238/';
// let baseUrl = 'http://192.168.1.26:3000/';



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
      console.log(home_id);
      return $http.post(baseUrl + "lists/homes/deactivate/" + home_id)
        .then(function(response) {
          console.log("deleting from service", response.data);
          return response.data
        })
    }

    //edit home
    this.saveEditedHome = function(home) {
      return $http.put(baseUrl + "lists/homes/edit", home)
        .then(function(response) {
          $rootScope.$emit('editHome', response.data);
          console.log('hello from rootscope in ctrl', data);
            return response.data;
          });
    };

    // add home
    this.createHome = function(home){
      console.log(home);
      return $http({
        method: 'POST',
        url: baseUrl + 'lists/homes',
        data: home
      })
    }






}); //end list service
