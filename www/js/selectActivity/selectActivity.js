'use strict';

angular.module('ionicApp.selectActivity', [])

.controller('selectActivityCtrl', function($scope, $state, $rootScope, $cordovaGeolocation, $ionicLoading, $http, $localStorage, socket){
  $scope.label = "What to do?";

  // Enter custom activity, rather than picking a pre-defined icon
  $scope.activityChange = function(newActivity){
    $scope.label = newActivity;
  };
  
  // Submits selected activity and stores in database via post request in Mobile Facade server
  $scope.postActivity = function(){
    if (!$scope.label || $scope.label === '' || $scope.label === 'What to do?') {
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
        $http.post($rootScope.mobileFacadeURL + '/api/checkin/addcheckin', {access_token: $localStorage.access_token, latitude: lat, longitude: long, activity: $scope.label, userId: $localStorage.userData.fbId})
          .then(function(){
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
  };

  // sets login rootscope variable to false so bottom bar shows
  $rootScope.login = false;
  $rootScope.isPrivateChat = false;  
  
  $scope.user = {
    firstName: ''
  }

});

// add extra line at end
