'use strict';

angular.module('ionicApp', [
  'ionic', 
  'ionicApp.login', 
  'ionicApp.selectActivity', 
  'ionicApp.chat', 
  'ionicApp.otherUsers', 
  'ionicApp.profile', 
  'ionicApp.addFbLikes',
  'ionicApp.services',
  'ionicApp.directives',
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
  .state('chatDetail', {
    url: '/chatDetail/:chatId',
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

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top, standard

    // do not allow user swipe left to go back to previous viewed screen (introduces bugs into the app)
    $ionicConfigProvider.views.swipeBackEnabled(false);
}])

.run(function($localStorage, $rootScope, $location, socket){
  $rootScope.distance = 5;
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

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
  });
});

//add extra line at the end
