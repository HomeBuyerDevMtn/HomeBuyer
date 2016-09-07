angular.module('homeBuyer').service('homeService', function($http){
let baseurl = 'http://localhost:3000';
  this.createHome = function(home){
    console.log(home);
    return $http({
      method: 'POST',
      url: baseurl + '/lists/homes',
      data: home
    })
  }

})
