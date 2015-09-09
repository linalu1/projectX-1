'use strict';

angular.module('ionicApp.profile', [])

.controller('profileCtrl', function($scope, $state, $localStorage, $rootScope) {
  // console.log('userpic url',$localStorage.userData.pic.data.url)
  $rootScope.login = false;
  // $scope.currentUser = {
  //   name: $localStorage.userData.name,
  //   profilePic: $localStorage.userData.pic.data.url 
  // }
  
  $rootScope.currentUser = {
    name: 'Lina',
    age: '23',
    profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11110530_10206522392155533_3913495922613816060_n.jpg?oh=161d0b56a17c1139362dccc3f7e5c4bf&oe=565F6768"
  }


  $scope.redirectToFind = function() {
    $state.go('findSettings');
  }

  $scope.redirectToSettings = function() {
    $state.go('generalSettings');
  }
})
.controller('findSettingsCtrl', function($scope, $state) {
  $scope.redirectToShowUserSettings = function() {
    $state.go('showUserSettings');
  }
  $scope.redirectToProfileSettings = function() {
    $state.go('profile');
  }

  $scope.distance = 50;

  $scope.distanceUnit = "miles";

  $scope.age = 100;

})

.controller('generalSettingsCtrl', function($scope, $state) {
  $scope.redirectToProfileSettings = function() {
    $state.go('profile');
  }

})
.controller('showUserSettingsCtrl', function($scope, $state) {
  $scope.redirectToFind = function() {
    $state.go('findSettings');
  }
})

;

// add extra line at end
