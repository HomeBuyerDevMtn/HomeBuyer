angular.module('homeBuyer')

    .controller('userListCtrl', function($scope, userListService, $ionicSideMenuDelegate){
let cur_user_id = 1;

        $scope.getUserListsCtrl = function(user_id) {
            userListService.getUserLists(user_id).then(function(response) {
                $scope.lists = response;
                console.log($scope.lists)
            })
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

        $scope.toggleLeft = function() {
          $ionicSideMenuDelegate.toggleLeft()
        };

$scope.getUserListsCtrl(cur_user_id)

    })




    //////////////////////
    ///////SERVICE////////
    //////////////////////


    .service('userListService', function($http) { //for some reason ES6 broke this
        let baseUrl = 'http://localhost:3000/';
        // let baseUrl = 'http://172.19.245.68:3000/'
        this.getUserLists = (user_id) => {
            return $http({
                method: 'GET',
                url: baseUrl + 'lists/' + user_id
            }).then((response) => {
                return response.data;
            })
        }
    })
