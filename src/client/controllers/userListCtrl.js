angular.module('homeBuyer')


    .controller('userListCtrl', function($scope, userListService, $ionicSideMenuDelegate){

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser);


        $scope.getUserListsCtrl = function(user_id) {
            userListService.getUserLists(user_id).then(function(response) {
                $scope.lists = response;
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


        $scope.getUserListsCtrl(currentUser.user_id);

        $scope.addNewList = function(list_name) {
            console.log(list_name);
            let newListObj = {
              list_name: list_name,
              user_id: currentUser.user_id
            }
            userListService.addNewList(newListObj).then(function(response) {
                $scope.getUserListsCtrl(currentUser.user_id);
            })
        }
      }) //end controller




    //////////////////////
    ///////SERVICE////////
    //////////////////////


    .service('userListService', function($http) { //for some reason ES6 broke this
        let baseUrl = 'http://localhost:3000/';
        // let baseUrl = 'http://138.68.17.238/';

        this.getUserLists = (user_id) => {
            return $http({
                method: 'GET',
                url: baseUrl + 'lists/' + user_id
            }).then((response) => {
                return response.data;
            })
        }

        this.addNewList = (newListObj) => {
          console.log(newListObj);
            return $http({
                method: 'POST',
                url: baseUrl + 'lists/',
                data: newListObj
            }).then((response) => {
              return response.data;
            })
        }
    })
