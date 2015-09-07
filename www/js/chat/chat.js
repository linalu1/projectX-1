'use strict';

angular.module('ionicApp.chat', [])

.controller('chatCtrl', function($scope, $state, $rootScope) {
  $rootScope.login = false;
  $scope.chats = [{name: "Omar", lastText: "LOL", face: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1604716_10202673663939733_1410194365_n.jpg?oh=5f132a47f63f52e413c62d872c171748&oe=566920ED", id: 123}];

})

.controller('chatDetailCtrl', function($scope, $state, $rootScope, $ionicScrollDelegate) {
  // some get req based on the id to get info on that certian chat
  // each chat room has a socket id.... we can use that id itself... bam
  $rootScope.login = false;


  // ajax request here
  // ajax response here 
  var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  $scope.user = {_id: 123};
  $scope.chatMsgs = [{text: 'hi', userId: 1234}, {text: 'hi', userId: 123}, {text: 'hi', userId: 1234}, {text: 'hi', userId: 123}];

  $scope.toUser = {username:"Nate", pic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1604716_10202673663939733_1410194365_n.jpg?oh=5f132a47f63f52e413c62d872c171748&oe=566920ED"};
  $scope.fromUser = {username:"Omar", pic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/10417801_10205603744989928_8706339890647288713_n.jpg?oh=d055bbd53c3fec5dc75f8b151600bd6c&oe=56727532"};


  $scope.submitText = function(text){
    $scope.chatMsgs.push({text: text, userId: 123, time: new Date()});
    $scope.input.message = "";
    viewScroll.resize();
    viewScroll.scrollBottom();
  }
})

// add extra line at end
