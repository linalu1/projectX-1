'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, $state, $ionicSlideBoxDelegate, $rootScope, $cordovaOauth, $localStorage, $http) {
  $rootScope.login = true;

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };

  $scope.loggingInFb = function() {
    $cordovaOauth.facebook("840774716036629", ["email", "user_website", "user_likes", "user_photos","user_location", "user_relationships"]).then(function(result) {

        console.log(result);
        $http.post('http://10.6.1.162:3000/api/auth/facebook', {access_token: result.access_token})
          .then(function(userDataInfo){
            console.log(userDataInfo);
            $localStorage.userData = userDataInfo.data;
            $localStorage.access_token = result.access_token;
            $state.go("selectActivity");
          });

    }, function(error) {
        alert("There was a problem signing in!  See the console for logs");
        console.log(error);
    });
  };

  $scope.loggingInTwitter = function() {
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
