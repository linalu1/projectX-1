'use strict';

angular.module('ionicApp.selectActivity', [])

.controller('selectActivityCtrl', function($scope, $state, $rootScope) {
  $scope.toLogin = function(){
    $state.go('login');
  };
  $scope.user = {
    firstName: ''
  }

  $rootScope.$state = $state;


});

// add extra line at end
