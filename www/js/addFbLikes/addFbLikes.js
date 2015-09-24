'use strict';

angular.module('ionicApp.addFbLikes', [])

.controller('addFbLikesCtrl', function($scope, $state, $rootScope) {

  // set login rootScope variable to false to display bottom tab bar. (Since it's not the login screen);
  $rootScope.login = false;

});

// add extra line at end
