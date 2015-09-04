'use strict';

angular.module('ionicApp.chat', [])

.controller('chatCtrl', function($scope, $state, $rootScope) {
  $rootScope.login = false;
  $scope.chats = [{name: "Omar", lastText: "LOL", face: "http://img.timeinc.net/time/daily/2010/1011/poy_nomination_agassi.jpg", id: 123}];
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

  $scope.toUser = {username:"nate", pic: "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg"};
  $scope.fromUser = {username:"omar", pic: "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg"};


  $scope.submitText = function(text){
    $scope.chatMsgs.push({text: text, userId: 123, time: new Date()});
    $scope.input.message = "";
    viewScroll.resize();
    viewScroll.scrollBottom();
  }
})

// add extra line at end
