'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, $state, $ionicSlideBoxDelegate, $rootScope) {
  $rootScope.login = true;

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.loggingInFb = function() {
    $state.go('selectActivity');
  };
  $scope.loggingInTwitter = function() {
    $state.go('selectActivity');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});

// add extra line at end
