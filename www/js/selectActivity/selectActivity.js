'use strict';

angular.module('ionicApp.selectActivity', [])

.controller('selectActivityCtrl', function(
  $scope, 
  $state, 
  $rootScope, 
  $cordovaGeolocation, 
  $ionicLoading
  ) 
{
  $scope.label = "Select Activity";

  $scope.activityChange = function(newActivity){
    $scope.label = newActivity;
  }
  
  $scope.postActivity = function(){
    if (!$scope.label || $scope.label === '') {
      alert('Select something');
      return;
    }

    $ionicLoading.show({
      template: 'Getting position...'
    });
    var posOptions = {timeout: 5000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(lat);
        console.log(long);
        $ionicLoading.hide();

      }, function(err) {
        console.log(err);
        $ionicLoading.hide();
        alert("Error getting position")
      });

  }
  // watch.clearWatch();

  $rootScope.login = false;
  $scope.toLogin = function(){
    $state.go('login');
  };
  $scope.user = {
    firstName: ''
  }

});

// add extra line at end
