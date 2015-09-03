'use strict';

angular.module('ionicApp', ['ionic', 'ionicApp.login', 'ionicApp.selectActivity', 'ionicApp.chat', 'angularMoment', 'luegg.directives'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  })
  .state('addFbLikes', {
    url: '/',
    templateUrl: 'js/addFbLikes/addFbLikes.html',
    controller: 'addFbLikesCtrl'
  })
  .state('chat', {
    url: '/chat',
    templateUrl: 'js/chat/chat.html',
    controller: 'chatCtrl'
  })
  .state('chat-detail', {
    url: '/chat/:chatId',
    templateUrl: 'js/chat/chatdetail.html',
    controller: 'chatDetailCtrl'
  })
  .state('otherUsers', {
    url: '/',
    templateUrl: 'js/otherUsers/otherUsers.html',
    controller: 'otherUsersCtrl'
  })
  .state('profile', {
    url: '/',
    templateUrl: 'js/profile/profile.html',
    controller: 'profileCtrl'
  })
  .state('selectActivity', {
    url: '/selectActivity',
    templateUrl: 'js/selectActivity/selectActivity.html',
    controller: 'selectActivityCtrl'
  });
  $urlRouterProvider.otherwise("/");
})
.run(function ($state, $rootScope) {
    $rootScope.$state = $state;
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
