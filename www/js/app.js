'use strict';

angular.module('ionicApp', [
  'ionic', 
  'ionicApp.login', 
  'ionicApp.selectActivity', 
  'ionicApp.chat', 
  'ionicApp.otherUsers', 
  'ionicApp.profile', 
  'ionicApp.addFbLikes',
  'angularMoment', 
  'luegg.directives', 
  'ngStorage', 
  'ngCordova',
  'btford.socket-io'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl',
  })
  .state('addFbLikes', {
    url: '/addFbLikes',
    templateUrl: 'js/addFbLikes/addFbLikes.html',
    controller: 'addFbLikesCtrl',
    authenticate: true // change to 'false' for testing
  })
  .state('chat', {
    url: '/chat',
    templateUrl: 'js/chat/chat.html',
    controller: 'chatCtrl',
    authenticate: true // change to 'false' for testing

  })
  .state('chat-detail', {
    url: '/chat/:chatId',
    templateUrl: 'js/chat/chatdetail.html',
    controller: 'chatDetailCtrl',
    authenticate: true // change to 'true' for testing
  })
  .state('home', {
    url: '/home',
    templateUrl: 'js/otherUsers/otherUsers.html',
    controller: 'otherUsersCtrl',
    authenticate: true // change to 'false' for testing

  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'profileCtrl',
    authenticate: true // change to 'false' for testing
  })
  .state('selectActivity', {
    url: '/selectActivity',
    templateUrl: 'js/selectActivity/selectActivity.html',
    controller: 'selectActivityCtrl',
    authenticate: true // change to 'false' for testing
  })
  .state('findSettings', {
    url: '/findSettings',
    templateUrl: 'js/profile/findSettings.html',
    controller: 'findSettingsCtrl',
    authenticate: true // change to 'false' for testing
  })
  .state('showUserSettings', {
    url: '/showUserSettings',
    templateUrl: 'js/profile/showUserSettings.html',
    controller: 'showUserSettingsCtrl',
    authenticate: true // change to 'false' for testing
  })
  .state('generalSettings', {
    url: '/generalSettings',
    templateUrl: 'js/profile/generalSettings.html',
    controller: 'generalSettingsCtrl',
    authenticate: true // change to 'false' for testing
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

  $rootScope.distance = 5;
  $rootScope.mobileFacadeURL = 'http://192.168.128.114:3000';
  // sets the default var

  if ($localStorage.access_token) {
    $location.path('/otherUsers');
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
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

//add extra line at the end
