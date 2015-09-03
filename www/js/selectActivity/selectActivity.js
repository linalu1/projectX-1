'use strict';

angular.module('ionicApp.selectActivity', [])

.controller('selectActivityCtrl', function($scope, $state) {
  $scope.toLogin = function(){
    $state.go('login');
  }
  $scope.user = {
    firstName: ''
  };

});

// add extra line at end
