'use strict';

angular.module('ionicApp.chat', [])

.controller('chatCtrl', function($scope, $state, $rootScope, $localStorage, socket) {

  // sets login to false to display the tab bar
  $rootScope.login = false;

  // Invokes the function to render all conversations.
  if($localStorage.userChatDetails) {
    $rootScope.refactorChatDetailsForChatRender($localStorage.userChatDetails);    
  }
  $scope.chats = $localStorage.userChatDetailsRender || [];

  // When user receives a new message, update this view.
  socket.on('receive new message', function(data) {
    if($localStorage.userChatDetails) {
      $scope.$apply(function() {
        $rootScope.refactorChatDetailsForChatRender($localStorage.userChatDetails);
      })
    }
  })
})


.controller('chatDetailCtrl', function($scope, $state, $rootScope, $ionicScrollDelegate, socket, $localStorage, chatServicesSocket, $ionicPopover, $http, $stateParams) {

  // For the top right corner drop down menu (to add user)
  $ionicPopover.fromTemplateUrl('templates/chat/popOverChatSetting.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  // login variable set to false for bottom tab bar to appear
  $rootScope.login = false;

  // Makes post request to user database for a single user's info 
  $rootScope.getUserInfo = function(userID, callback) {
    $http.post($rootScope.mobileFacadeURL + '/api/user/chatGetUserInfo', {access_token: $localStorage.access_token, userID: userID})
    .then(function(body) {
      callback(userID, body.data);      
    }, function(err) {
      console.log('err:', err);
      alert("cannot retrieve userinfo");
    })
  };

  // Makes post request to user database for multiple user's info
  $scope.getUsersInfo = function(arrayOfUserIDs, callback) {
    $http.post($rootScope.mobileFacadeURL + '/api/user/chatGetUsersInfo', {access_token: $localStorage.access_token, userID: arrayOfUserIDs})
    .then(function(body) {
      callback(body.data);
    }, function(err) {
      alert('cannot retrieve userinfo of one or more users ');
      console.log('error:', err);
    })
  };

  // Adds a user as a participant inside a chat. 
  $scope.addUsersAsParticipant = function(userData) {
    $rootScope.participantUserIDs = $rootScope.participantUserIDs || {};
    for (var key in userData) {
      $rootScope.participantUserIDs[key] = userData[key];
    }
    $scope.generateListOfParticipantsString($rootScope.participantUserIDs);
    $scope.chatMsgs = $scope.retrieveExistingConversation($stateParams.chatId);    
    if(Array.isArray($scope.chatMsgs)) {
      $scope.doneLoading = true;
    }  
    viewScroll.resize();
    viewScroll.scrollBottom();
  };

  // Allocates the current user's info into $scope variables
  $scope.getCurrentUserInfo = function() {
    $scope.userData = $localStorage.userData;
    $scope.currentUserId = $scope.userData.fbId;
    $scope.currentUserProfileImage = $scope.userData.pic.data.url;
    $scope.currentUserFirstName = $scope.userData.name.substr(0, $scope.userData.name.indexOf(' '));    

    // initializes participantUserCount
    $scope.participantUserCount = 1;
  }();

  // Generates a string of all participants' first names 
  $scope.generateListOfParticipantsString = function(participantsObject) {
    $scope.participantUserIDsArray = []; 
    for (var key in participantsObject) {
      $scope.participantUserIDsArray.push(participantsObject[key].firstName);
    }  
    $scope.participantUserIDsString = $scope.participantUserIDsArray.join(', ');
  };

  // If current chat is private, it populates the users array with information. This is to retrieve the most updated first names (dynamic due to Facebook rules) and profile pictures from user database. 
  $scope.checkIfIsPrivateChat = function(){
    if($rootScope.isPrivateChat) {
      var usersArray = [];
      usersArray.push($scope.currentUserId);
      usersArray.push($rootScope.selectedUserToMsg);
      $scope.getUsersInfo(usersArray, $scope.addUsersAsParticipant)
    } else {
      console.log("it's not a private chat.")
    }
  };
  $scope.checkIfIsPrivateChat();

  // Invokes the function to genrate a string of all participants' first names
  $scope.generateListOfParticipantsString($rootScope.participantUserIDs); 

  // Adds another user to chat.
  $scope.addingUserToChat = function(userIDToAdd) {
    $rootScope.getUserInfo(userIDToAdd, $scope.addUserAsParticipant);

    // if there are 2 or less participants in the current chat, then we want to open a new chat window to support the multi-user chat feature.
    if($rootScope.participantUserIDsArray.length < 3) {
      $rootScope.selectedChatId = $scope.currentUserId + Date.now();

      // add the new participant to an array of participants.
      var allParticipatingUsers = [];
      for (var key in $scope.participantUserIDs) {
        allParticipatingUsers.push(key);
      }
      allParticipatingUsers.push(userIDToAdd);

      // update all participating users' localstorage with the new chat ID. 
      socket.emit('update other user public chat storage', $rootScope.selectedChatId, allParticipatingUsers, function(data) {
        console.log(data)
      });

      // update array of public chats in database
      chatServicesSocket.emit('add public chat to participant storage', $rootScope.selectedChatId, allParticipatingUsers, function(data) {
        console.log(data);
      })

      // create a new conversation in database with new chatID
      var conversationData = {
        chatId: $rootScope.selectedChatId,
        firstSender: $localStorage.userData.fbId,
        timestamp_updated: Time.now(),
        participants: allParticipatingUsers,
        group: true
      };
      chatServicesSocket.emit('create new conversation in database', conversationData, function(data) {
      })

      // redirect current user to new chat view (corresponding to te new chatID)
      $state.go('chatDetail', {chatId: $rootScope.selectedChatId}, {reload: true});

    } else {

      // Generate an object to store key info 
      var objectOfMessageData = {
        chatId: $stateParams.chatId,
        newParticipantId: userIDToAdd
      }
      var userArray = [];
      userArray.push(userIDToAdd);

      // Get the information of the new added user
      $rootScope.getUserInfo(userIDToAdd, $scope.addUserAsParticipant);
      socket.emit('added new user to chat', 
        $rootScope.participantUserIDs, 
        $scope.currentUserId, 
        function(data){
      });

      // update localStorage of the newly added participant.
      socket.emit('update other user public chat storage', $stateParams.chatId, userArray, function(data) {
        console.log(data);
      });

      // update DB convo participants in database. 
      chatServicesSocket.emit('add participant to conversation', objectOfMessageData, function(data) {
        console.log(data);
      })

      // update array of public chats in database for the newly added participant
      chatServicesSocket.emit('add public chat to participant storage', $stateParams.chatId, userArray, function(data) {
        console.log(data);
      })
    }
  };

  // listens for events where a new participant is added (or removed), and updates the string of users accordingly. 
  socket.on('chat participant updates', function(data) {
    $rootScope.participantUserIDs = data;
    $scope.participantUserCount  = 0;
    for (var key in $rootScope.participantUserIDs) {
      $rootScope.participantUserIDsString += JSON.stringify($rootScope.participantUserIDs[key]) + '';
      $scope.participantUserCount++;
    }  
  })

  // Takes care of scrolling inside the chat view
  var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');

  // Retrieve existing conversation from database. Using the chatID
  $scope.retrieveExistingConversation = function(chatID) {
    var chatMessages = [];
    if(chatID && $localStorage.userChatDetailsObject && $localStorage.userChatDetailsObject[chatID]) {
      var currConversation = $localStorage.userChatDetailsObject[chatID];
      var participants = currConversation.participants;
      var messages = currConversation.messages;

      // refactoring message structure 
      for (var i = 0 ;i < messages.length; i++) {
        var oldStructure = messages[i];
        var newStructure = {};
        newStructure.text = oldStructure.text;
        newStructure.firstName = $rootScope.participantUserIDs[oldStructure.senderID].firstName; // something
        newStructure.userId = oldStructure.senderID;
        newStructure.timestamp_created = oldStructure.timestamp_created;
        newStructure.profileImage = $rootScope.participantUserIDs[oldStructure.senderID].profileImage;
        chatMessages.push(newStructure);
      }
    }
    return chatMessages;
  };

  // listens for new messages from other users
  socket.on('receive new message', function(data){
    // check if the receiving conversation's chatID matches the current convo's chatID
    if(data.conversationId === $stateParams.chatId) {
      $scope.chatMsgs.push({
        text: data.message, 
        firstName: data.senderFirstName, 
        userId: data.senderId, 
        timestamp_created: data.messageTime, 
        profileImage: data.senderProfileImage
      });
    } else {
      // send iOS/Android notification to user
    }
    viewScroll.resize();
    viewScroll.scrollBottom();
  });

  //Saves a message to Database. 
  $scope.saveMessageToDatabase = function(messageData) {
    chatServicesSocket.emit( 'save message to database', 
      messageData, 
      function(data) {
    });
    $rootScope.getUserChatInfo($localStorage.userData.fbId);
  };

  // Invoked upon pressing 'send' inside the chat window. 'text' refers to the message that the user would like to send.
  $scope.submitText = function(text){
    $scope.chatMsgs = $scope.chatMsgs || [];
    $scope.chatMsgs.push({text: text, firstName: $scope.currentUserFirstName, userId: $scope.currentUserId, timestamp_created: Date.now(), profileImage: $scope.currentUserProfileImage});
    viewScroll.resize();
    viewScroll.scrollBottom();
    $scope.input.message = "";
    $scope.messageData = {
      message: text,
      messageTime: Date.now(),
      senderId: $scope.currentUserId,
      senderProfileImage: $scope.currentUserProfileImage,
      senderFirstName: $scope.currentUserFirstName,
      conversationId: $stateParams.chatId,
      messageParticipants: $rootScope.participantUserIDs
    }
    $scope.saveMessageToDatabase($scope.messageData);
    
    // Tell the other user to update localstorage messages by pulling from database (if other user is not in same chat window)
    socket.emit('tell other user to update localStorage messages', $rootScope.participantUserIDs, function(data) {
    });
    // Sends message to other user directly. if other user is not in same chat window, will notify other user instead. 
    socket.emit('send message', $scope.messageData, $rootScope.participantUserIDs, function(data) {
    });      
  };

  // Invoked when pressing the 'Back' button
  $scope.redirectToChats = function() {
    $state.go('chat');
  };

})

// add extra line at end
