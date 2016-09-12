// angular.module('homeBuyer').controller('homeCtrl', function($scope, $http, homeService, $ionicModal, $location){
  angular.module('homeBuyer')

    .controller('homeCtrl', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, homeService, $location) {
  $scope.createHome = function(home) {
    var newHome = {
      list_id: 1,
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
      days_listed: home.daysListed
    }

    console.log(newHome);
    homeService.createHome(newHome).then(function(response){
      console.log(response);
      $location.path('myHome');
    })
  }

  $scope.poo = function() {
    console.log("hello there")
  }

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
    $scope.showModal('./views/prioritiesTempl.html');
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
