angular.module('homeBuyer').config(function($stateProvider, $urlRouterProvider){
 $stateProvider

 .state('login', {
   url: '/login',
   cache: false,
   templateUrl: './views/login.html',
   controller: 'loginCtrl'
 })
  .state('priorities', {
    url: '/priorities',
    cache: false,
    templateUrl: './views/prioritiesTempl.html',
    controller: 'prioritiesCtrl'
  });

 $urlRouterProvider.otherwise('/login');
});
