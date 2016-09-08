angular.module('homeBuyer').service('homeService', function($http){
// let baseurl = 'http://localhost:3000';
let baseurl = 'http://192.168.0.108:3000';
  this.createHome = function(home){
    console.log(home);
    return $http({
      method: 'POST',
      url: baseurl + '/lists/homes',
      data: home
    })
  }

})
