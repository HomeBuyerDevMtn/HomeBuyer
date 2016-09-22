angular.module('homeBuyer')


    .controller('userListCtrl', function($scope, userListService, $ionicSideMenuDelegate){

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser.user_id);
      console.log(JSON.stringify(currentUser.user_id));

      //get all lists by user id
        $scope.lists;
        $scope.getUserListsCtrl = function(user_id) {
          console.log(user_id);
            userListService.getUserLists(user_id).then(function(response) {
              console.log('here in ctr', $scope.lists);
                $scope.lists = response;
                console.log($scope.numberOfHomes);
            });
        };
        $scope.getUserListsCtrl(currentUser.user_id);


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

        //archive list
        $scope.deactivateList = function(id, $index) {
          userListService.deactivateList(id)
            .then(function(response) {
              $scope.lists.splice($index, 1);
              console.log(response);
              $scope.getUserListsCtrl(currentUser.user_id);
            });
        };

        $scope.getUserListsCtrl(currentUser.user_id);

        $scope.addNewList = function(list_name, priorities) {
            console.log('you are in addNewList', 'list_name', list_name, "priorities", priorities);
            let newListObj = {
              list_name: list_name,
              user_id: currentUser.user_id,
              priorities: priorities
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
        // let baseUrl = 'http://localhost:3000/';
        let baseUrl = 'http://138.68.17.238/'
        // let baseUrl = 'http://192.168.1.24:3000/';


        this.getUserLists = (user_id) => {
          console.log("in service", user_id);
            return $http({
                method: 'GET',
                url: baseUrl + 'lists/' + user_id
            }).then((response) => {
                console.log('here is response.data', response.data);
                return response.data;
            })
        }



        this.addNewList = (newListObj) => {
            return $http({
                method: 'POST',
                url: baseUrl + 'lists/',
                data: newListObj
            }).then((response) => {
              return response.data;
            })
        }

        this.deactivateList = (id) => {
          console.log(id);
            return $http({
                method: 'PUT',
                url: baseUrl + 'lists/' + id,
                data: id
            }).then((response) => {
              return response.data;
            })
        }
    })
