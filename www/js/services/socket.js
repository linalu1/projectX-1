'use strict';

angular.module('ionicApp.services', [])
.factory('socket',function(socketFactory, $rootScope, $localStorage){
    //Create socket and connect to http://chat.socket.io 
  $rootScope.mobileFacadeURL = 'http://192.168.128.114:3000';

  // console.log('$rootScope.mobileFacadeURL', $rootScope.mobileFacadeURL);
  var myIoSocket = io.connect($rootScope.mobileFacadeURL);
  console.log('inside factory1')
  var mySocket = socketFactory({  
    ioSocket: myIoSocket
  });
  console.log('inside factory2');

  myIoSocket.emit('helloServer');
  myIoSocket.on('helloClient', function(data) {
    console.log('Server said hello to client');
  })



  // myIoSocket.on('news', function (data) {
  //     console.log(data);
  //     myIoSocket.emit('my other event', { my: 'data' });
  //   });


  return mySocket;
})
.factory('chatServicesSocket', function(socketFactory, $rootScope) {
  console.log('inside factory3');
  var chatServicesSocket = io.connect('http://192.168.128.114:3003');

  var myChatSocket = socketFactory({  
    ioSocket: chatServicesSocket
  });



  chatServicesSocket.on('testing1', function(data) {
    console.log(data);
    chatServicesSocket.emit('testing2', {lina: 'isSoAwesome'});
  });
  console.log('inside factory3');
  return chatServicesSocket;

})
;


//***************** Chat Services Socket ********************//


//add extra line at the end
