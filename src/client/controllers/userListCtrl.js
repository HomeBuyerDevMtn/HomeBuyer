angular.module('homeBuyer')

    .controller('userListCtrl', function($scope, userListService){

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser.user_id);
      console.log(JSON.stringify(currentUser.user_id));

        $scope.getUserListsCtrl = function(user_id) {
          console.log(user_id);
            userListService.getUserLists(user_id).then(function(response) {
              console.log('here in ctr', $scope.lists);
                $scope.lists = response;
            });
        };
        $scope.getUserListsCtrl(currentUser.user_id)

      }) //end controller



    //////////////////////
    ///////SERVICE////////
    //////////////////////


    .service('userListService', function($http) { //for some reason ES6 broke this
        // let baseUrl = 'http://localhost:3000/';
        let baseUrl = 'http://138.68.17.238/'
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
    })
