angular.module('homeBuyer').config(function($stateProvider, $urlRouterProvider){
 $stateProvider

 .state('login', {
   url: '/login',
   templateUrl: './views/login.html',
   controller: 'loginCtrl'
 })

 .state('addHome', {
   url: '/addHome',
   templateUrl: './views/createHome.html',
   controller: 'loginCtrl'
 })

 $urlRouterProvider.otherwise('/login');
})
