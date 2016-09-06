angular.module('homeBuyer').config(function($stateProvider, $urlRouterProvider){
 $stateProvider

 .state('login', {
   url: '/login',
   templateUrl: './views/login.html',
   controller: 'loginCtrl'
 })

 $urlRouterProvider.otherwise('/login');
})