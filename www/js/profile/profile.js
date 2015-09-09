'use strict';

angular.module('ionicApp.profile', [])

.controller('profileCtrl', function($scope, $state, $localStorage, $rootScope) {
  $rootScope.login = false;
  $scope.currentUser = {
    name: $localStorage.userData.name,
    profilePic: $localStorage.userData.pic.data.url 
  }
  



  $scope.redirectToFind = function() {
    $state.go('findSettings');
  }

  $scope.redirectToSettings = function() {
    $state.go('generalSettings');
  }
})
.controller('findSettingsCtrl', function($scope, $state, $rootScope) {
  $scope.redirectToShowUserSettings = function() {
    $state.go('showUserSettings');
  }
  $scope.redirectToProfileSettings = function() {
    $state.go('profile');
  }

  $scope.updateDist = function(distance){
    $rootScope.distance = distance;
  }

  $scope.distanceUnit = "miles";
  $scope.age = 100;

})

.controller('generalSettingsCtrl', function($scope, $state, $localStorage) {
  $scope.redirectToProfileSettings = function() {
    $state.go('profile');
  }

  $scope.logout = function(){
    $localStorage.$reset();
    $state.go('login');
  }

})
.controller('showUserSettingsCtrl', function($scope, $state) {
  $scope.redirectToFind = function() {
    $state.go('findSettings');
  }
})

;

// add extra line at end
