'use strict';

angular.module('ionicApp.chat', [])

.controller('chatCtrl', function($scope, $state, $rootScope) {
  $rootScope.login = false;
  $scope.chats = $localStorage.userChatDetails;
  // [{name: "Omar", lastText: "LOL", face: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1604716_10202673663939733_1410194365_n.jpg?oh=5f132a47f63f52e413c62d872c171748&oe=566920ED", id: 123}];

})


.controller('chatDetailCtrl', function($scope, $state, $rootScope, $ionicScrollDelegate, socket, $localStorage, chatServicesSocket, $ionicPopover, $http, $stateParams) {
  // some get req based on the id to get info on that certian chat
  // each chat room has a socket id.... we can use that id itself... bam


  console.log('---------------------------------->stateParams', $stateParams);
  console.log('------------------------------------>selectedChatId', $rootScope.selectedChatId)

  $ionicPopover.fromTemplateUrl('templates/chat/popOverChatSetting.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $rootScope.login = false;

  $scope.InputPlaceholder = [
    'Say Hello!',
    'Be nice :)',
    'Tell them what you want to do!',
    'Be spontaneous???',
    'Just have fun',
    "Don't forget to rate the app!",
    "Be happy, we are!",
    'Smile lots'
  ]

  // may need to reset this if a new ID is opened.
  // $scope.participantUserIDs = {};

  var generateRandomInputPlaceholder = function(array) {
    var index = Math.floor(Math.random() * array.length);
    $scope.$apply(function() {
      $scope.RandomInputPlaceholder = $scope.InputPlaceholder[index]
    })
  }

  $scope.getUserInfo = function(userID, callback) {
    console.log('inside getUserInfo')
    console.log('inside getUserInfo for userID:', userID);
    $http.post($rootScope.mobileFacadeURL + '/api/user/chatGetUserInfo', {access_token: $localStorage.access_token, userID: userID})
    .then(function(body) {
      console.log('received a response inside getUserInfo chat.js')
      console.log('userinfo received:',body.data);
      callback(userID, body.data);
    }, function(err) {
      alert("cannot retrieve userinfo");
      console.log('error:', err);
    })
  };



  $scope.addUserAsParticipant = function(userID, userData) {
    console.log('B. THIS MUST BE SHOWN**********************')

    if($scope.participantUserIDs && !$scope.participantUserIDs[userID]) {
      $scope.participantUserIDs[userID] = userData;
    } else if (!$scope.participantUserIDs) {
      $scope.participantUserIDs = {};
      $scope.participantUserIDs[userID] = userData;

    }
    console.log('current users in object:', $scope.participantUserIDs);
    $scope.generateListOfParticipantsString($scope.participantUserIDs);
  };

  $scope.getCurrentUserInfo = function() {
    console.log('A. THIS MUST BE SHOWN**********************')
    $scope.userData = $localStorage.userData;
    $scope.currentUserId = $scope.userData.fbId;
    $scope.currentUserProfileImage = $scope.userData.pic.data.url;
    $scope.currentUserFirstName = $scope.userData.name.substr(0, $scope.userData.name.indexOf(' '));    

    // initialize participantUserCount
    $scope.participantUserCount = 1;
  }();

  // $scope.saveReceiverInformation =   
  // $scope.receiverUserId = $rootScope.selectedUserToMsg;
  // $scope.receiverUserInfo = $rootScope.selectedUserToMsgInfo;


  // possibly redundant
  $scope.recordCurrentChatID = function() {
    if($rootScope.selectedChatId) {
      $scope.selectedChatId = $rootScope.selectedChatId;    
      console.log('selectedChatId', $rootScope.selectedChatId);
    }    
  }();

  $scope.generateListOfParticipantsString = function(participantsObject) {
    console.log('C. THIS MUST BE SHOWN**********************')

    $scope.participantUserIDsArray = [];
    for (var key in participantsObject) {
      $scope.participantUserIDsArray.push(participantsObject[key].firstName);
    }  
    $scope.participantUserIDsString = $scope.participantUserIDsArray.join(', ');

    console.log('this should show all users in the chat as array', $scope.participantUserIDsArray); 

    console.log('this should show all users in the chat:',$scope.participantUserIDsString)
      // $scope.participantUserIDsString += JSON.stringify(participantsObject[key]) + ', ';
  }


  $scope.checkIfIsPrivateChat = function(){
    console.log('checking if it is a private chat')
    console.log('$rootScope.selectedUserToMsg', $rootScope.selectedUserToMsg);
    if($rootScope.isPrivateChat) {
      $scope.getUserInfo($scope.currentUserId, $scope.addUserAsParticipant);
      $scope.getUserInfo($rootScope.selectedUserToMsg, $scope.addUserAsParticipant);
    } else {
      // add some logic here.
      console.log("it's not a private chat. add some logic here")
    }
  }
  $scope.checkIfIsPrivateChat();

  $scope.generateListOfParticipantsString($scope.participantUserIDs);

  $scope.chatInitiatedFromClick = function(userID) {

  }

  // $scope.receiverFirstName = $scope.participantUserIDs
  // $scope.receiverUserIDs.push($scope.receiverUserId);

  $scope.addingUserToChat = function(userIDToAdd) {
    // need shittonne of logic here. if currently 2 users, open new chat. if 3 users, persist in current chat
    // also need to display message saying ____ has been added to the conversation
    if($scope.participantUserIDsArray.length < 3) {
      $rootScope.selectedChatId = $scope.currentUserId + Date.now()
      $state.go('chatDetail', {chatId: $rootScope.selectedChatId}, {reload: true});
      // open a new chat
      // $rootScope.current
    } else {
      $scope.getUserInfo(userIDToAdd, $scope.addUserAsParticipant);
      console.log('addingUserToChat invoked');
      console.log('**********************************',$scope.participantUserIDs);
      socket.emit('added new user to chat', 
        $scope.participantUserIDs, 
        $scope.currentUserId, 
        function(data){
        console.log('emitting "adding new user to chat"');
      });            
    }

    // gets user info and adds user as participant

  }



  socket.on('chat participant updates', function(data) {
    console.log('socket.on "chat participant updates"');

    $scope.participantUserIDs = data;
    $scope.participantUserCount  = 0;
    for (var key in $scope.participantUserIDs) {
      $scope.participantUserIDsString += JSON.stringify($scope.participantUserIDs[key]) + '';
      $scope.participantUserCount++;
    }  


  })

  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!$scope.selectedChatId', $scope.selectedChatId);
  // ajax request here
  // ajax response here 
  var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  // $scope.user = {_id: 123};
  // $scope.chatMsgs = 
  //   [{text: 'hi', userId: $scope.receiverUserId, firstName: $scope.receiverFirstName, timestamp_created: 1442248009876, profileImage: $scope.receiverUserInfo.profilePic}, 
  //   {text: 'hi', userId: $scope.userData.fbId, firstName: $scope.currentUserFirstName,timestamp_created: 1442248061232, profileImage: $scope.userData.pic.data.url }, 
  //   {text: 'hi', userId: $scope.receiverUserId, firstName: $scope.receiverFirstName, timestamp_created: 1442248075389, profileImage: $scope.receiverUserInfo.profilePic}, 
  //   {text: 'hi', userId: $scope.userData.fbId, firstName: $scope.currentUserFirstName, timestamp_created: 1442248085159, profileImage: $scope.userData.pic.data.url }];

  $scope.retrieveExistingConversation = function(chatID) {
    $rootScope
    if(chatID && $localStorage.userChatDetails[chatID]) {
      var currConversation = $localStorage.userChatDetails[chatID];
      var participants = currConversation.participants;
      for (var i = 0 ; i < participants.length; i++) {
        $scope.getUserInfo(participants[i], $scope.addUserAsParticipant);
      }
      
    }
  }

  $scope.retrieveExistingConversation($stateParams.chatId);

  // $localStorage.userChatDetails[stateParams.chatId].messages

  $scope.chatMsgs = [];

  // if($scope.participantUserIDs)
  // $scope.authorData = $localStorage.userData;
  // $scope.

  // $scope.toUser = {username:"Nate", pic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1604716_10202673663939733_1410194365_n.jpg?oh=5f132a47f63f52e413c62d872c171748&oe=566920ED"};
  // $scope.fromUser = {username:"Omar", pic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/10417801_10205603744989928_8706339890647288713_n.jpg?oh=d055bbd53c3fec5dc75f8b151600bd6c&oe=56727532"};



  socket.on('receive new message', function(data){
    console.log('****************** received a new message *****************');
    $scope.chatMsgs.push({
      text: data.message, 
      firstName: data.senderFirstName, 
      userId: data.senderId, 
      timestamp_created: data.messageTime, 
      profileImage: data.senderProfileImage
    });

    // $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
  });

  $scope.saveMessageToDatabase = function(messageData) {
    // if conversation ID doesn't exist, create one in side Database.

    // use socket to do this
    console.log('----------------------------->messageData', messageData);
    // if don't use socket, do below. 
    chatServicesSocket.emit( 'save message to database', 
      messageData, 
      function(data) {
        console.log('chatServicesSocket.emit "save message to database"');
        console.log('data');
    });


    // $http.post($rootScope.mobileFacadeURL + '/api/chat/saveMessageToDatabase')
  }


  $scope.submitText = function(text){
    // socket.emit('send message', text, toUser.userId);


    if($scope.chatMsgs.length < 1) {

    }

    $scope.messageData = {
      message: text,
      messageTime: Date.now(),
      senderId: $scope.currentUserId,
      senderProfileImage: $scope.currentUserProfileImage,
      senderFirstName: $scope.currentUserFirstName,
      conversationId: $scope.selectedChatId,
      messageParticipants: $scope.participantUserIDs
    }

    $scope.saveMessageToDatabase($scope.messageData);


    // redundant. 
    // if($scope.chatMsgs.length < 1) {
    //   // you want to create a new conversation here. 
    // }


    console.log('$scope.messageData',$scope.messageData);
    // depending on if the chat exists in userChat's allchat's array,  
      // if it does, simply do post request to send message
      // if it doesn't, do a post request to create a new database AND send message. (I think);


    //chuck this in an array

    // for (var key in participantUserIDs) {
    socket.emit('send message', 
        $scope.messageData, 
        $scope.participantUserIDs, 
        // $scope.currentUserId,
        function(data) {
      console.log('emitting "send message"');
      // $chat.append('<span class="error">' + data + "</span><br/>");
    });      
    // }




    // $scope.chatMsgs.push({text: text, userId: 123, time: new Date()});
    $scope.chatMsgs.push({text: text, firstName: $scope.currentUserFirstName, userId: $scope.currentUserId, timestamp_created: Date.now()});

    $scope.input.message = "";
    viewScroll.resize();
    viewScroll.scrollBottom();
  }

  $scope.redirectToChats = function() {
    $state.go('chat');
  }
})

// add extra line at end
