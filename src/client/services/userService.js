angular.module('homeBuyer').service('userService', function($http){

  this.readUserById = function(email) {
    console.log(user);
    return $http({
      method: 'GET',
      url: '/user/' + email,
    })
  }

})
