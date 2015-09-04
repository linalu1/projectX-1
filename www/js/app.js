'use strict';

angular.module('ionicApp', ['ionic', 'ionicApp.login', 'ionicApp.selectActivity', 'ionicApp.chat', 'angularMoment', 'luegg.directives', 'ngStorage', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  })
  .state('addFbLikes', {
    url: '/addFbLikes',
    templateUrl: 'js/addFbLikes/addFbLikes.html',
    controller: 'addFbLikesCtrl',
    authenticate: true
  })
  .state('chat', {
    url: '/chat',
    templateUrl: 'js/chat/chat.html',
    controller: 'chatCtrl',
    authenticate: true

  })
  .state('chat-detail', {
    url: '/chat/:chatId',
    templateUrl: 'js/chat/chatdetail.html',
    controller: 'chatDetailCtrl',
    authenticate: true

  })
  .state('otherUsers', {
    url: '/otherUsers',
    templateUrl: 'js/otherUsers/otherUsers.html',
    controller: 'otherUsersCtrl',
    authenticate: true

  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'profileCtrl',
    authenticate: true
  })
  .state('selectActivity', {
    url: '/selectActivity',
    templateUrl: 'js/selectActivity/selectActivity.html',
    controller: 'selectActivityCtrl',
    authenticate: true

  });
  $urlRouterProvider.otherwise("/");
})

// redundant unless this method is being used to hide top/bottom bar for login.html
/*
.run(function ($state, $rootScope) {
    $rootScope.$state = $state;
})
*/

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top, standard

}])

.run(function($localStorage, $rootScope, $location){

  if ($localStorage.access_token) {
    $location.path('/profile');
  }

  $rootScope.$on('$stateChangeStart', function (evt, next, current) {
    if (next.authenticate && !$localStorage.access_token) {
      $rootScope.login = false;
      $location.path('/');
    }
  });
})

.directive('ionMdInput', function(){
  return {
    restrict: 'E',
    transclude: true,
    template:
      '<input type="text" required>'+
      // commented out to remove the 'flash' on input
      // '<span class="md-highlight"></span>'+
      '<span class="md-bar"></span>'+
      '<label>{{label}}</label>',
    scope: {
      'label': '@'
    }
  }
});

//add extra line at the end
