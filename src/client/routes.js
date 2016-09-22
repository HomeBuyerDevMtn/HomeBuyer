angular.module('homeBuyer').config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('/HomeBuyer');

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
    controller: 'prioritiesCtrl',
    params: {
      list_name: null,
      list_id: null
    }
  })
  .state('ratings', {
    url: '/ratings',
    cache: false,
    templateUrl: './views/homeratingsTmpl.html',
    controller: 'ratingsCtrl',
    params: {
      user_id: null,
      home_id: null
    }
  })

 .state('addHome', {
   url: '/addHome',
   templateUrl: './views/createHome.html',
   controller: 'homeCtrl'
 })

 .state('myHome', {
   url: '/myHome',
   templateUrl: './views/homeView.html',
   controller: 'homeCtrl',
   cache: false,
   params: {
     home_id: null,
     list_id: null
   }
 })

 .state('list', {
   url: '/list',
   templateUrl: './views/listView.html',
   controller: 'listCtrl',
   cache: false,
   params: {
     list_id: null,
     list_name: null
   }
 })

 .state('userList', {
   url: '/userList',
   templateUrl: './views/userListsTmpl.html',
   controller: 'userListCtrl',
   cache: false


 })

 .state('landingPage',{
   url: '/HomeBuyer',
   templateUrl: './views/landingPage.html'
 })

 .state('signUp',{
   url: '/sign_up',
   templateUrl: './views/sign-up.html'
 })

});
