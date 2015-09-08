'use strict';

angular.module('ionicApp.profile', [])

.controller('profileCtrl', function($scope, $state, $rootScope) {
  $rootScope.login = false;
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




  // // $(function () {
  // jQuery(function($){

  //   console.log("'i'mthebest'")
  //   $("#range_example").ionRangeSlider({
  //       // hide_min_max: true,
  //       // keyboard: true,
  //       // min: 0,
  //       // max: 5000,
  //       // from: 1000,
  //       // to: 4000,
  //       // type: 'double',
  //       // step: 1,
  //       // prefix: "$",
  //       // grid: true
  //       type: "double",
  //       min: 1000,
  //       max: 5000,
  //       from: 2000,
  //       to: 4000,
  //       step: 100,
  //       onStart: function (data) {
  //           console.log(data);
  //       },
  //       onChange: function (data) {
  //           console.log(data);
  //       },
  //       onFinish: function (data) {
  //           console.log(data);
  //       },
  //       onUpdate: function (data) {
  //           console.log(data);
  //       },
  //       force_edges: true
  //   });
  // });

  // });

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
