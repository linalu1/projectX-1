'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, socket, $state, $ionicSlideBoxDelegate, $rootScope, $cordovaOauth, $localStorage, $http) {
  $rootScope.login = true;
  // myIoSocket.on('')

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };

  $scope.loggingInFb = function() {
    $cordovaOauth.facebook("849824961798271", ["email", "user_likes", "user_photos","user_birthday"]).then(function(result) {

        console.log('result', result);
        $http.post($rootScope.mobileFacadeURL + '/api/auth/facebook', {access_token: result.access_token})
          .then(function(userDataInfo){
            console.log('userDataInfo:', userDataInfo);
            console.log('userId:',userDataInfo.data.fbId);
            //call the getUserChatInfo function here
            
            console.log('userDataInfo', userDataInfo);
            $localStorage.userData = userDataInfo.data;
            $localStorage.access_token = result.access_token;
            $scope.getUserChatInfo(userDataInfo.data.fbId);
            $state.go("selectActivity");
          });
    }, function(error) {
        alert("There was a problem signing in!  See the console for logs");
        console.log(error);
    });
  };

  // create a function to get userChatInfo. do a Get request to Mobile Facade. Mobile Facade does a get request to userChats database.

  $scope.getUserChatInfo = function(userId) {
    console.log('getUserChatInfo client method called.')
    console.log('userId', userId);
    $http.post($rootScope.mobileFacadeURL + '/api/chat/getUserChats', {access_token: $localStorage.access_token, userId: userId})
      .then(function(userDataChats) {
        console.log('inside login.js clint side - userDataChats:', userDataChats)
        $localStorage.userDataChats = userDataChats;
      }, function(err) {
        alert('there was a problem retrieving the all chats of the current user, error:', err);
        console.log('error:', err);
      });
  };

  $scope.getMessageHistory = function() {
    $rootScope.storedMessages = {};
  }

  socket.on('twitter listener', function() {
    console.log('client listened to server after it registered twitter');
  });

  $scope.loggingInTwitter = function() {
    console.log('clicked on twitter')
    socket.emit('clicked on twitter');
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
