'use strict';

angular.module('ionicApp.chat', [])

.controller('chatCtrl', function($scope, $state, $rootScope) {
  $rootScope.login = false;
  $scope.chats = [{name: "Omar", lastText: "LOL", face: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1604716_10202673663939733_1410194365_n.jpg?oh=5f132a47f63f52e413c62d872c171748&oe=566920ED", id: 123}];

})

.controller('chatDetailCtrl', function($scope, $state, $rootScope, $ionicScrollDelegate, socket, $localStorage) {
  // some get req based on the id to get info on that certian chat
  // each chat room has a socket id.... we can use that id itself... bam
  $rootScope.login = false;

  $scope.userData = $localStorage.userData;
  $scope.currentUserFirstName = $scope.userData.name.substr(0, $scope.userData.name.indexOf(' '));

  $scope.currentUserId = $scope.userData.fbId;
  console.log('$scope.userData', $scope.userData);
  $scope.receiverUserId = $rootScope.selectedUserToMsg;
  $scope.receiverUserInfo = $rootScope.selectedUserToMsgInfo;
  $scope.receiverFirstName = $scope.receiverUserInfo.username.substr(0,$scope.receiverUserInfo.username.indexOf(' '));
  console.log('$scope.receiverUserId', $scope.receiverUserId);
  console.log('$scope.receiverUserInfo', $scope.receiverUserInfo);

  // ajax request here
  // ajax response here 
  var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  $scope.user = {_id: 123};
  $scope.chatMsgs = 
    [{text: 'hi', userId: $scope.receiverUserId, firstName: $scope.receiverFirstName, timestamp_created: 1442248009876}, 
    {text: 'hi', userId: $scope.userData.fbId, firstName: $scope.currentUserFirstName,timestamp_created: 1442248061232}, 
    {text: 'hi', userId: $scope.receiverUserId, firstName: $scope.receiverFirstName, timestamp_created: 1442248075389}, 
    {text: 'hi', userId: $scope.userData.fbId, firstName: $scope.currentUserFirstName, timestamp_created: 1442248085159}];

  $scope.authorData = $localStorage.userData;
  // $scope.

  $scope.toUser = {username:"Nate", pic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1604716_10202673663939733_1410194365_n.jpg?oh=5f132a47f63f52e413c62d872c171748&oe=566920ED"};
  $scope.fromUser = {username:"Omar", pic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/10417801_10205603744989928_8706339890647288713_n.jpg?oh=d055bbd53c3fec5dc75f8b151600bd6c&oe=56727532"};


  $scope.submitText = function(text){
    // socket.emit('send message', text, toUser.userId);
    
    // depending on if the chat exists in userChat's allchat's array,  
      // if it does, simply do post request to send message
      // if it doesn't, do a post request to create a new database AND send message. (I think);


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
