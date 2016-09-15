angular.module('homeBuyer')

    .controller('userListCtrl', function($scope, userListService){
let cur_user_id = 1;        

        $scope.getUserListsCtrl = function(user_id) {
            userListService.getUserLists(user_id).then(function(response) {
                $scope.lists = response;
                console.log($scope.lists)
            })
        }
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


