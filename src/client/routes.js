angular.module('homeBuyer').config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('/login');

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
  })
  .state('ratings', {
    url: '/ratings',
    cache: false,
    templateUrl: './views/homeratingsTmpl.html',
    controller: 'ratingsCtrl'
  })

 .state('addHome', {
   url: '/addHome',
   templateUrl: './views/createHome.html',
   controller: 'homeCtrl'
 })

 .state('myHome', {
   url: '/myHome',
   templateUrl: './views/homeView.html',
   controller: 'homeCtrl'
 })

 .state('list', {
   url: '/list',
   templateUrl: './views/listView.html',
   controller: 'listCtrl',
   params: {
     list_id: null
   }
 })

 .state('userList', {
   url: '/userList',
   templateUrl: './views/userListsTmpl.html',
   controller: 'userListCtrl'


 })

});
