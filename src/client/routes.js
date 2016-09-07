angular.module('homeBuyer').config(function($stateProvider, $urlRouterProvider){
 $stateProvider

 .state('login', {
   url: '/login',
   cache: false,
   templateUrl: './views/login.html',
   controller: 'loginCtrl'
 })
  .state('camera', {
    url: '/addpicture',
    cache: false,
    templateUrl: './views/cameraTmpl.html',
    controller: 'cameraCtrl'
  })

 $urlRouterProvider.otherwise('/login');
})
