angular.module('homeBuyer')
    .controller('homeCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, homeviewService, $location, $ionicSideMenuDelegate, $stateParams, listService, $ionicPopup) {
// console.log(JSON.stringify(homeService));

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let home_id = $stateParams.home_id;
      // console.log('this is list id', list_id);
      // console.log(currentUser);


  //get home info by home id
  $scope.getHomeById = function(home_id) {
    console.log('hi from ctrl', home_id);
    homeviewService.getHomeById(home_id)
      .then(function(response) {
        $scope.currentHome = response
          console.log("hi this is the home", $scope.currentHome);
      })
  };
  console.log(home_id);
  $scope.getHomeById(home_id);


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

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft()
  };

  //confirm alert
  // $scope.showAlert = function() {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Home updated!',
  //     template: 'Changes are officially updated 🏡'
  //   });
  // };

  $scope.showUpdatedAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Home updated!',
      template: 'Home is officially updated 🏡 '
    });
    alertPopup.then(function(res) {
      if(res) {
       //  console.log("don't");
       console.log("this is the home id", home_id);
        $state.go('myHome', {home_id: home_id});
      }
    })
  };

}) //end home controller


.service('homeviewService', function($http) {
// let baseUrl = 'http://localhost:3000/';
let baseUrl = 'http://138.68.17.238/'

this.getHomeById = function(home_id) {
  return $http({
    method: "GET",
    url: baseUrl + "lists/homes/id/" + home_id
  }).then(function(response){
    console.log(response.data[0]);
    return response.data[0];
  })
};
}) //end service
