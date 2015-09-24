'use strict';

angular.module('ionicApp.services', [])
.factory('socket',function(socketFactory, $rootScope, $localStorage){
  
  //Create socket and connect to MobileFacade. rootScope variable created to allow reference from other files.
  $rootScope.mobileFacadeURL = 'http://10.6.1.165:3000';

  // construct the socket factory
  var myIoSocket = io.connect($rootScope.mobileFacadeURL);
  var mySocket = socketFactory({  
    ioSocket: myIoSocket
  });

  // listen for events to update current user's localstorage public chat
  myIoSocket.on('update user public chat storage', function(data) {
    if($localStorage.userAllChatsObject && !localStorage.userAllChatsObject[data]) {
      $localStorage.userAllChatsArray.push(data);
      $localStorage.userAllChatsObject[data] = true;
    }
  })

  return mySocket;
})
.factory('chatServicesSocket', function(socketFactory, $rootScope) {

  //Create socket and connect to MobileFacade  
  var chatServicesSocket = io.connect('http://10.6.1.165:3003');

  // construct the socket factory
  var myChatSocket = socketFactory({  
    ioSocket: chatServicesSocket
  });
  return chatServicesSocket;
})
;

//add extra line at the end
