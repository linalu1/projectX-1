'use strict';

angular.module('ionicApp.services', [])
.factory('socket',function(socketFactory, $rootScope){
      //Create socket and connect to http://chat.socket.io 
      console.log('$rootScope.mobileFacadeURL', $rootScope.mobileFacadeURL);
    var myIoSocket = io.connect('http://10.6.1.165:3000');
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
});

//add extra line at the end
