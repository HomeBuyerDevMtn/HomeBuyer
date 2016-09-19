angular.module('homeBuyer')
    .controller('homeCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, homeviewService, $location, $ionicSideMenuDelegate, $stateParams, listService, $ionicPopup) {
// console.log(JSON.stringify(homeService));

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let home_id = $stateParams.home_id;
      // console.log('this is list id', list_id);
      // console.log(currentUser);
  //
  // $scope.createHome = function(home) {
  //   var newHome = {
  //     list_id: 1,
  //     nickname: home.nickname,
  //     price: home.price,
  //     address_1: home.address1,
  //     address_2: home.address2,
  //     city: home.city,
  //     zip: home.zip,
  //     province: home.state,
  //     bathrooms: home.bathrooms,
  //     bedrooms: home.bedrooms,
  //     sq_feet: home.sqFootage,
  //     year_build: home.year,
  //     description: home.description,
  //     days_listed: home.daysListed
  //   }
  //
  //   console.log(newHome);
  //   homeService.createHome(newHome).then(function(response){
  //     console.log(response);
  //     $location.path('myHome');
  //   })
  // }

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
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Home updated!',
      template: 'Changes are officially updated 🏡'
    });
  };

}) //end home controller


.service('homeviewService', function($http) {
// let baseUrl = 'http://localhost:3000/';
let baseUrl = 'http://192.168.1.24:3000/'

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
