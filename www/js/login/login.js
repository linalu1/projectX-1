'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, socket, chatServicesSocket, $state, $ionicSlideBoxDelegate, $rootScope, $cordovaOauth, $localStorage, $http) {

  // initiate socket listening event to listen for changes to private chat storage upon receiving a private message
  socket.on('receiving changes to private chat storage', function(chatID, senderID) {
    $localStorage.userPrivateChats[senderID] = chatID;
    $localStorage.userAllChatsArray.push(chatID);
    $localStorage.userAllChatsObject[chatID] = true;
  });

  // initiate socket listening event to listen for events to change localStorage messages.
  socket.on('update localStorage messages', function() {
    $rootScope.getUserChatInfo($localStorage.userData.fbId);
  });

  // set to true to not display the bottom bar.
  $scope.$apply(function() {
    $rootScope.login = true;
  });
  $rootScope.login = true;
  $rootScope.isPrivateChat = false;

  // was implemented during testing. can be deleted later.
  $scope.startApp = function() {
    $state.go('main');
  };

  // invoked when click on Facebook login icon. Takes user to 'selectActivity' view.
  $scope.loggingInFb = function() {
    $cordovaOauth.facebook("849824961798271", ["email", "user_likes", "user_photos","user_birthday"]).then(function(result) {
        $http.post($rootScope.mobileFacadeURL + '/api/auth/facebook', {access_token: result.access_token})
          .then(function(userDataInfo){
            $localStorage.userData = userDataInfo.data;
            $localStorage.access_token = result.access_token;
            $rootScope.getUserChatInfo(userDataInfo.data.fbId);
            $state.go("selectActivity");
            socket.emit('new user logged on', userDataInfo.data.fbId, function(data){
            });
          });
    }, function(error) {
        alert("There was a problem signing in!  See the console for logs");
        console.log(error);
    });
  };

  // Creates objects to store key-value pairs from userChatDetail arrays, for faster lookup
  $rootScope.objectifyUserChatDetails = function(array) {
    $localStorage.userChatDetailsObject = {};
    for (var i =0 ; i<array.length; i++) {
      var chatID = array[i].chatId;
      $localStorage.userChatDetailsObject[chatID] = array[i];
    }
  }

  // Creates objects to store key-value pairs from userChat storage arrays, for faster lookup
  $rootScope.objectifyUserAllChats = function(array) {
    $localStorage.userAllChatsObject = {};
    for (var i = 0 ; i < array.length; i++) {
      var chatIDKey = array[i];
      $localStorage.userAllChatsObject[chatIDKey] = true;
    }
  }

  // Create a function to get userChatInfo. do a Get request to Mobile Facade. Mobile Facade does a get request to userChats database.
  $rootScope.getAllChats = function(chatIDs) {
    $http.post($rootScope.mobileFacadeURL + '/api/chat/getChatDetails', {access_token: $localStorage.access_token, chatIDs: chatIDs})
    .then(function(userChatDetails) {
      $localStorage.userChatDetails = userChatDetails.data;
      $rootScope.objectifyUserChatDetails($localStorage.userChatDetails);
    }, function(err) {
      console.log('encountered error retrieving all chats');
      console.log('err:', err);
    })
  };

  // creates a post request to userservices database to retrieve information. Able to pass an array of userIDs so can retrieve user info for multiple userIDs.
  $scope.getUsersInfo = function(arrayOfUserIDs, callback) {
    $http.post($rootScope.mobileFacadeURL + '/api/user/chatGetUsersInfo', {access_token: $localStorage.access_token, userID: arrayOfUserIDs})
    .then(function(body) {
      callback(body.data);
    }, function(err) {
      alert('cannot retrieve userinfo of one or more users ');
      console.log('error:', err);
    })
  };

  // refactors chat details into proper format for display in view for all conversations. Also retrieves dynamic information such as first name (Facebook's setting makes it dynamic) and profile picture 
  $rootScope.refactorChatDetailsForChatRender = function(localStorageUserChatDetails) {
    $localStorage.userChatDetailsRender = [];
    for (var i =0; i < localStorageUserChatDetails.length; i++) {
      var currConvo = localStorageUserChatDetails[i];
      var convoToPush = {}, userInfoObject, senderUserIDSaved;
      var participantUsersArray = currConvo.participants;

      // filter out current user. This is so that the current user's first name is not included in the string which shows all other participants' first names, in all chats view and specific chat view.
      var participantUsersArrayNoCurrUser = [];
      for (var i = 0; i < participantUsersArray.length; i++) {
        if(participantUsersArray[i] !== $localStorage.userData.fbId) {
          participantUsersArrayNoCurrUser.push(participantUsersArray[i]);
        }
      }

      // Gets the sender name of the last sent message inside conversation, so if it's a multi person convo, only the last person's name is displayed.
      for (var i = currConvo.messages.length-1; i>= 0; i--) {
        if(currConvo.messages[i].senderID !== $localStorage.userData.fbId) {
          senderUserIDSaved = currConvo.messages[i].senderID;
          break;
        }
      }

      // Gets info of the participants for each conversation. Refactors it into an object and pushes it into a storage array for conversation rendering in allchats view.
      $scope.getUsersInfo(participantUsersArrayNoCurrUser, function(userInfo) {
        var participantsArray = [];
        for (var key in userInfo) {
          participantsArray.push(userInfo[key].firstName);
        }
        userInfoObject = userInfo;
        convoToPush.chatId = currConvo.chatId;
        convoToPush.lastMessage = currConvo.messages[currConvo.messages.length-1].text;
        convoToPush.participants = participantsArray.join(', ');
        convoToPush.participantIDs = participantUsersArrayNoCurrUser;
        convoToPush.senderProfileImage = userInfoObject[senderUserIDSaved].profileImage;
        convoToPush.lastMessage_timestamp = currConvo.timestamp_updated;
        convoToPush.group = currConvo.group;
        convoToPush.firstSender = currConvo.firstSender;
        console.log('convoToPush', convoToPush);
        $localStorage.userChatDetailsRender.push(convoToPush);
      });
    }
  }

  // Gets the chat information (all chats and private chats) for each user 
  $rootScope.getUserChatInfo = function(userId) {
    $http.post($rootScope.mobileFacadeURL + '/api/chat/getUserChats', {access_token: $localStorage.access_token, userId: userId})
      .then(function(userDataChats) {
        $localStorage.userPrivateChats = {};
        for (var i = 0 ; i < userDataChats.data.chatId_private.length; i++) {
          var curr = userDataChats.data.chatId_private[i];
          var userID = Object.keys(curr)[0];
          $localStorage.userPrivateChats[userID] = curr[userID];
        }
        $localStorage.userAllChatsArray = userDataChats.data.chatId_all;
        $rootScope.objectifyUserAllChats($localStorage.userAllChatsArray);
        $scope.getAllChats($localStorage.userAllChatsArray);
      }, function(err) {
        alert('there was a problem retrieving the all chats of the current user, error:', err);
        console.log('error:', err);
      });
  };

  // implement logic in future to support twitter login feature.
  $scope.loggingInTwitter = function() {
  };

  // for background swipe navigation
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  // for background swipe navigation
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

});

// add extra line at end
