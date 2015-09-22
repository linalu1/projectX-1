'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, socket, chatServicesSocket, $state, $ionicSlideBoxDelegate, $rootScope, $cordovaOauth, $localStorage, $http) {



  socket.on('receiving changes to private chat storage', function(chatID, senderID) {
    console.log("myIoSocket.on 'receiving changes to private chat storage' inside socket.js")
    console.log('################################################ NEED TO SEE THIS MESSAGE #############################')
    console.log('chatID', chatID);
    console.log('senderID:', senderID);
    $localStorage.userPrivateChats[senderID] = chatID;
    $localStorage.userAllChatsArray.push(chatID);
    $localStorage.userAllChatsObject[chatID] = true;
    // $rootScope.getAllChats($localStorage.userAllChats);
  });

  socket.on('update localStorage messages', function() {
    // $rootScope.getAllChats($localStorage.userAllChats);
    console.log('received message in background, updating loclStorage messages.')
    $rootScope.getUserChatInfo($localStorage.userData.fbId);
  });


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
      // $rootScope.refactorChatDetailsForChatRender($localStorage.userChatDetails);    

      $rootScope.objectifyUserChatDetails($localStorage.userChatDetails);
      console.log('THIS IS WHERE YOU CALL refactorChatDetailsForChatRender+++++++++++++++++++++++++++++++++++++')
      console.log('$localStorage.userChatDetails', $localStorage.userChatDetails);
      // if($localStorage.userChatDetails && !$localStorage.userChatDetailsRender) {
      //   $rootScope.refactorChatDetailsForChatRender($localStorage.userChatDetails);    
      // }

      // $rootScope.refactorChatDetailsForChatRender($localStorage.userChatDetails);    
    }, function(err) {
      console.log('encountered error retrieving all chats');
      console.log('err:', err);
    })
  };

  $scope.getUsersInfo = function(arrayOfUserIDs, callback) {
    console.log('inside getUserInfo')
    console.log('about to http.post')
    console.log(arrayOfUserIDs);
    $http.post($rootScope.mobileFacadeURL + '/api/user/chatGetUsersInfo', {access_token: $localStorage.access_token, userID: arrayOfUserIDs})
    .then(function(body) {
      console.log('received a response inside getUsersInfochat.js')
      console.log('userinfo received:', body.data);
      // console.log(callback);
      callback(body.data);
    }, function(err) {
      alert('cannot retrieve userinfo of one or more users ');
      console.log('error:', err);
    })
  };

  $rootScope.refactorChatDetailsForChatRender = function(localStorageUserChatDetails) {
    console.log('inside refactorChatDetailsForChatRender function')
    $localStorage.userChatDetailsRender = [];

    for (var i =0 ; i < localStorageUserChatDetails.length; i++) {

      var currConvo = localStorageUserChatDetails[i];
      console.log('currConvo', currConvo);
      var convoToPush = {}, userInfoObject, senderUserIDSaved;
      var participantUsersArray = currConvo.participants;
      // filter out current user.
      console.log('participantUsersArray', participantUsersArray)
      var participantUsersArrayNoCurrUser = [];
      for (var i = 0 ;i < participantUsersArray.length; i++) {
        if(participantUsersArray[i] !== $localStorage.userData.fbId) {
          participantUsersArrayNoCurrUser.push(participantUsersArray[i]);

          // participantUsersArray.splice(i, 1);
          // break;
          // return;
        }
      }
      console.log('participantUsersArrayNoCurrUser', participantUsersArrayNoCurrUser);


      for (var i = currConvo.messages.length-1; i>= 0; i--) {
        if(currConvo.messages[i].senderID !== $localStorage.userData.fbId) {
          senderUserIDSaved = currConvo.messages[i].senderID;
          break;
          // return;
        }
      }
      console.log('senderUserIDSaved', senderUserIDSaved);
      var otherUsersArray = [];

      // $rootScope.getUsersInfo(['1465443900431771', '10207060761214423', '149753995369062'], function(data) {
      //   console.log('inside callback@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      //   console.log('data', data);
      // });

      $scope.getUsersInfo(participantUsersArrayNoCurrUser, function(userInfo) {
        console.log('adding current convo to localStorage chat detail render');
        console.log('returned user info', userInfo);
        var participantsArray = [];
        for (var key in userInfo) {
          participantsArray.push(userInfo[key].firstName);
        }
        console.log('participantsArray', participantsArray);
        userInfoObject = userInfo;
        console.log('userInfoObject', userInfoObject);
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
    console.log('@@@@@@@@@@@@@@@$localStorage.userChatDetailsRender:', $localStorage.userChatDetailsRender)
  }

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
