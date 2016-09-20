angular.module('homeBuyer')

    .controller('userListCtrl', function($scope, userListService){

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser);

        $scope.getUserListsCtrl = function(user_id) {
            userListService.getUserLists(user_id).then(function(response) {
                $scope.lists = response;
            })
        }
        $scope.getUserListsCtrl(currentUser.user_id)

      }) //end controller



    //////////////////////
    ///////SERVICE////////
    //////////////////////


    .service('userListService', function($http) { //for some reason ES6 broke this
        // let baseUrl = 'http://localhost:3000/';
        let baseUrl = 'http://138.68.17.238/'
        this.getUserLists = (user_id) => {
            return $http({
                method: 'GET',
                url: baseUrl + 'lists/' + user_id
            }).then((response) => {
                return response.data;
            })
        }
    })
