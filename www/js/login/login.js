'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, socket, chatServicesSocket, $state, $ionicSlideBoxDelegate, $rootScope, $cordovaOauth, $localStorage, $http) {
  $rootScope.login = true;
  $rootScope.isPrivateChat = false;

  // myIoSocket.on('')

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };

  $scope.loggingInFb = function() {
    chatServicesSocket.emit('clicked on facebook');

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
            $rootScope.getUserChatInfo(userDataInfo.data.fbId);
            $state.go("selectActivity");

            socket.emit('new user logged on', userDataInfo.data.fbId, function(data){
              console.log('inside new user logged on! socket emitting')
              console.log('socke is emitting this data:',data)
            });
          });
    }, function(error) {
        alert("There was a problem signing in!  See the console for logs");
        console.log(error);
    });
  };

  $rootScope.objectifyUserChatDetails = function(array) {
    $localStorage.userChatDetailsObject = {};
    for (var i =0 ; i<array.length; i++) {
      var chatID = array[i].chatId;
      $localStorage.userChatDetailsObject[chatID] = array[i];
    }
  }

  $rootScope.objectifyUserAllChats = function(array) {
    $localStorage.userAllChatsObject = {};
    for (var i = 0 ; i < array.length; i++) {
      var chatIDKey = array[i];
      $localStorage.userAllChatsObject[chatIDKey] = true;
    }
  }

  // create a function to get userChatInfo. do a Get request to Mobile Facade. Mobile Facade does a get request to userChats database.
  $rootScope.getAllChats = function(chatIDs) {
    $http.post($rootScope.mobileFacadeURL + '/api/chat/getChatDetails', {access_token: $localStorage.access_token, chatIDs: chatIDs})
    .then(function(userChatDetails) {
      console.log('received response in getAllChats');
      console.log('userChatDetails:',userChatDetails);
      $localStorage.userChatDetails = userChatDetails.data;
      $rootScope.objectifyUserChatDetails($localStorage.userChatDetails);

    }, function(err) {
      console.log('encountered error retrieving all chats');
      console.log('err:', err);
    })
  };


  $rootScope.getUserChatInfo = function(userId) {
    console.log('getUserChatInfo client method called.')
    console.log('userId', userId);
    $http.post($rootScope.mobileFacadeURL + '/api/chat/getUserChats', {access_token: $localStorage.access_token, userId: userId})
      .then(function(userDataChats) {
        console.log('inside login.js clint side - userDataChats.data:', userDataChats.data) 
        // $localStorage.userDataChats = userDataChats.data;

        // remap the stored private chats from array to object for faster lookup when user does initiate conversation
        $localStorage.userPrivateChats = {};
        console.log('------------------------------>userDataChats.data.chatId_private', userDataChats.data.chatId_private);
        for (var i = 0 ; i < userDataChats.data.chatId_private.length; i++) {
          var curr = userDataChats.data.chatId_private[i];
          console.log('curr', curr);
          //DOUBLE CHECK THIS LOGIC 
          var userID = Object.keys(curr)[0];
          // var conversationID = curr[userID];
          $localStorage.userPrivateChats[userID] = curr[userID];
        }

        $localStorage.userAllChatsArray = userDataChats.data.chatId_all;

        $rootScope.objectifyUserAllChats($localStorage.userAllChatsArray);


        console.log('$localStorage.userAllChats', $localStorage.userAllChatsArray);
        $scope.getAllChats($localStorage.userAllChatsArray);

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

  chatServicesSocket.on('facebook listener', function() {
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
