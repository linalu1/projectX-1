'use strict';

angular.module('ionicApp.selectActivity', [])

.controller('selectActivityCtrl', function(
  $scope, 
  $state, 
  $rootScope, 
  $cordovaGeolocation, 
  $ionicLoading,
  $http,
  $localStorage
  ) 
{
  $scope.label = "Select Activity";

  $scope.activityChange = function(newActivity){
    $scope.label = newActivity;
  }
  
  $scope.postActivity = function(){
    if (!$scope.label || $scope.label === '' || $scope.label === 'Select Activity') {
      alert('Select something');
      return;
    }

    $ionicLoading.show({
      template: 'Adding Activity...'
    });

    var posOptions = {timeout: 5000, enableHighAccuracy: false};

    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(lat);
        console.log(long);
        console.log($localStorage.userData);

        $http.post('http://192.168.128.114:3000/api/checkin', {latitude: lat, longitude: long, activity: $scope.label, userId: $localStorage.userData.fbId})
          .then(function(){
            console.log('ADDED');
            $ionicLoading.hide();
          }, function(err){
            $ionicLoading.hide();
            alert('Failed to add Activity');
          })

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
