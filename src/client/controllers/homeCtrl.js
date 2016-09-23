angular.module('homeBuyer')
    .controller('homeCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, homeviewService, $location, $ionicSideMenuDelegate, $stateParams, listService, $ionicPopup, $state, $rootScope, ratingsService, prioritiesService) {

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let home_id = $stateParams.home_id;
      let user_id = currentUser.user_id;
      let list_id = $stateParams.list_id;

  //get home info by home id
  $scope.getHomeById = function(home_id) {
    console.log('hi from ctrl', home_id);
    homeviewService.getHomeById(home_id)
      .then(function(response) {
        $scope.currentHome = response
          console.log("hi this is the home", JSON.stringify($scope.currentHome));
          $scope.home_id = $scope.currentHome.id;
          $scope.list_id = $scope.currentHome.list_id;
      })
  };
  console.log(home_id);
  $scope.getHomeById(home_id);

$rootScope.$on('editHome', function(e, data) {
  $scope.getHomeById(data.id);
})


  $scope.allImages = [{
		'src' : 'img/house.jpg'
	}, {
		'src' : 'img/house2.jpeg'
	}, {
		'src' : 'img/house3.jpg'
  }, {
    'src' : 'img/house3.jpg'
  }, {
    'src' : 'img/house3.jpg'
  }, {
    'src' : 'img/house4.jpg'
	},{
		'src' : 'img/house.jpg'
	}, {
		'src' : 'img/house2.jpeg'
	}, {
		'src' : 'img/house3.jpg'
  }, {
    'src' : 'img/house3.jpg'
  }, {
    'src' : 'img/house3.jpg'
  }, {
    'src' : 'img/house4.jpg'
	}, {
		'src' : 'img/house.jpg'
	}
];

	$scope.showImages = function(index) {
		$scope.activeSlide = index;
		$scope.showModal('./views/image-modal.html');
	}

  $scope.showPriorities = function() {
    $scope.showModal('./views/prioritiesModal.html');
  }

  // show modal to edit home
  $scope.showEditHome = function() {
    $scope.homeToEdit = $scope.currentHome;
    $scope.saveEditedHome = function() {
      listService.saveEditedHome($scope.homeToEdit)
        .then(function(response) {
          console.log(response);
        })
    }
    $scope.showModal('./views/editHome.html');
  };

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

  //slide out left side menu
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft()
  };

  // save home that's been edited
  $scope.saveEditedHome = function() {
    listService.saveEditedHome($scope.homeToEdit)
      .then(function(response) {
      })
  }

  $scope.showUpdatedAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Home updated!',
      template: 'Home is officially updated 🏡 '
    });
    alertPopup.then(function(res) {
      if(res) {
       $scope.closeModal();
      }
    });
  };

  //////////////////////////////////
  //////// HOME SCORING ////////////
  //////////////////////////////////

  //get ratings in home by home id
  // $scope.getRatings = function(home_id, user_id) {
  //   ratingsService.getRatings(home_id, user_id)
  //     .then(function(response) {
        // console.log("this is ratings for", home_id, user_id, JSON.stringify(response));
        // $scope.rating_values = []
        // $scope.priority_ids = []

        // response.forEach(function(item, index) {
        //   $scope.rating_values.push(item.rating_value);
        //   $scope.priority_ids.push(item.priority_id)
        // })
  //     });
  // };
  // $scope.getRatings(home_id, user_id);

  //get priorities for home by list_id
  // $scope.getPriorities = function(list_id, user_id) {
  //   prioritiesService.getPriorities(list_id, user_id)
  //     .then(function(response) {
  //       $scope.priority_values = [];

  //       response.forEach(function(item, index) {
  //         $scope.priority_values.push(item.priority_value)
  //       })

  //       $scope.getHouseScore = function(arr1, arr2) {
  //           var total = 0;
  //           for (var i = 0; i < arr1.length; i++) {
  //             total += ((arr1[i] / 100) * (arr2[i] / 100));
  //           };
  //           $scope.currentHomeScore = total * 100;
  //           console.log("home score", JSON.stringify($scope.currentHomeScore));
  //       };
  //       $scope.getHouseScore($scope.priority_values, $scope.rating_values);

  //     });
  // };
  // $scope.getPriorities(list_id, user_id);



  //do math --> (priority number / 100) * (rating number / 100) = score value, sum all score values * 100 = final score
  // $scope.currentHomeScore;



}) //end home controller


.service('homeviewService', function($http) {
// let baseUrl = 'http://192.168.1.24:3000/';
// let baseUrl = 'http://localhost:3000/';
let baseUrl = 'http://138.68.17.238/'

this.getHomeById = function(home_id) {
  return $http({
    method: "GET",
    url: baseUrl + "lists/homes/id/" + home_id
  }).then(function(response){
    console.log(response.data);
    return response.data;
  })
};


}) //end service
