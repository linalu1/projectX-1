'use strict';

angular.module('ionicApp.profile', [])

.controller('profileCtrl', function($scope, $state, $localStorage, $rootScope) {
  $rootScope.login = false;
  $rootScope.isPrivateChat = false;


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

.controller('generalSettingsCtrl', function($scope, $state, $localStorage, $rootScope) {
  $scope.redirectToProfileSettings = function() {
    $state.go('profile');
  }

  $scope.logout = function(){
    // for (var prop in $rootScope) {
    //     if (prop.substring(0,1) !== '$') {
    //         delete $rootScope[prop];
    //     }
    // }
    $rootScope = $rootScope.$new(true);
    $scope = $scope.$new(true);
    $localStorage.$reset();
    $scope.$apply(function() {
      $rootScope.login = true;
    })
    $rootScope.login = true;
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
