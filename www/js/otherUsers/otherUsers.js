'use strict';

angular.module('ionicApp.otherUsers', [])

.controller('otherUsersCtrl', function($scope, $state, $rootScope, $cordovaGeolocation, $http, $localStorage, $location, socket, chatServicesSocket) {
  console.log($localStorage.userData);

  // gets nearby users by post request to Mobile Facade server. Sends own location to render closest users first.
  var loadNearbyUsers = function(){
    if ($localStorage.userData){
      $cordovaGeolocation
        .getCurrentPosition({timeout: 5000, enableHighAccuracy: false})
        .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          $http.post($rootScope.mobileFacadeURL + '/api/checkin/getcheckin?latitude=' + lat + '&longitude=' + long + '&distance=' +  $rootScope.distance + '&currentFbId=' + $localStorage.userData.fbId, {access_token: $localStorage.access_token})
            .then(function(resp){
              $rootScope.userResults = resp.data;
              for (var i = 0 ; i < $rootScope.userResults.length; i++) {
                $rootScope.userResults[i].distanceMiles = $rootScope.userResults[i].distanceMiles || '<1';
                var firstNameOnly = $rootScope.userResults[i].username.slice(0, $rootScope.userResults[i].username.indexOf(' '));
                $rootScope.userResults[i].username = firstNameOnly;
              }
            })
          });
    }
  };
  loadNearbyUsers();

  // login rootScope var set to false so bottom tabs do display
  $rootScope.login = false;
  $rootScope.isPrivateChat = false;
  
  // declare scope variable to store equivalent rootscope variable.
  $scope.storedMessages = $rootScope.storedMessages;

  // invoked upon clicking on mailbox in another user's info card. It will redirect user to the chat view. 
  $scope.sendMessage = function(userId, userInfo) {
    $rootScope.participantUserIDs = {};
    $scope.currentTime = Date.now();
    $rootScope.isPrivateChat = true;
    if(userId) {
      $rootScope.currentUserId = $localStorage.userData.fbId;
      var currentUserIdVar = $rootScope.currentUserId;
      $rootScope.selectedUserToMsg = userId;
      $rootScope.selectedUserToMsgInfo = userInfo;
      $rootScope.selectedChatId =  $localStorage.userPrivateChats[userId] || currentUserIdVar.concat($scope.currentTime);

      // Update the other user's private chat storage to ensure that it has the identical chat id stored for the current user's ID to prevent creation of a different chatID for the same user-pair.
      socket.emit('update other user private chat storage', userId, $rootScope.selectedChatId, $localStorage.userData.fbId, function(data) {
        console.log('data:', data);
      });

      // Create a conversation in database with user-pair details. 
      var tempParticipantsArray = [];
      tempParticipantsArray.push($rootScope.currentUserId);
      tempParticipantsArray.push($rootScope.selectedUserToMsg);
      $scope.createNewConversationInDatabase($rootScope.selectedChatId, $localStorage.userData.fbId,$scope.currentTime,tempParticipantsArray,false)

      // Check if user-pair conversation already exists. if not, store the key-value pair in localStorage.
      if(!$localStorage.userPrivateChats[userId]) {
        $localStorage.userPrivateChats[userId] = $rootScope.selectedChatId;
      }

      // Checks if chatID exists inside userallchats object. UserAllChats object is used to pull all conversations for loading in allchats view (it has all the chatIDs).
      if(!$localStorage.userAllChatsObject[$rootScope.selectedChatId]) {
        $localStorage.userAllChatsObject[$rootScope.selectedChatId] = true;
        $localStorage.userAllChatsArray.push($rootScope.selectedChatId);
      }
    }
  };

  // Formats the conversation attribute inputs in a way so it can be posted to the server and stored inside database.
  $scope.createNewConversationInDatabase = function(chatId, firstSender, timestamp_updated, participants, group) {
    var conversationData = {
      chatId: chatId,
      firstSender: firstSender,
      timestamp_updated: timestamp_updated,
      participants: participants,
      group: group
    };

    // Emit socket message to chatservices server to save the conversation. 
    chatServicesSocket.emit('create new conversation in database', conversationData, function(data) {
      console.log('chatServicesSocket.emit emitting create new conversation in database ');
    })
  };
    
  // Reload nearby users every 5 seconds.
  setInterval(function(){
    loadNearbyUsers();
  }, 5000);              

});

// add extra line at end
