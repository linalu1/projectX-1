'use strict';

angular.module('ionicApp.services', [])
.factory('socket',function(socketFactory){
      //Create socket and connect to http://chat.socket.io 

    var myIoSocket = io.connect('http://10.6.1.165:3003');
    console.log('inside factory1')
    var mySocket = socketFactory({  
      ioSocket: myIoSocket
    });
    console.log('inside factory2')

    return mySocket;

});

//add extra line at the end
