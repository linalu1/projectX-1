'use strict';

angular.module('ionicApp', ['ionic', 'ionicApp.login', 'ionicApp.selectActivity'])

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
    controller: 'addFbLikesCtrl'
  })
  .state('chat', {
    url: '/chat',
    templateUrl: 'js/chat/chat.html',
    controller: 'chatCtrl'
  })
  .state('otherUsers', {
    url: '/otherUsers',
    templateUrl: 'js/otherUsers/otherUsers.html',
    controller: 'otherUsersCtrl'
  })
  .state('profile', {
    url: '/profile',
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

// redundant unless this method is being used to hide top/bottom bar for login.html
/*
.run(function ($state, $rootScope) {
    $rootScope.$state = $state;
})
*/

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
