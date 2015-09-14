'use strict';

angular.module('ionicApp.otherUsers', [])

.controller('otherUsersCtrl', function($scope, $state, $rootScope, $cordovaGeolocation, $http, $localStorage, $location) {
  console.log($localStorage.userData);
  var loadNearbyUsers = function(){
    if ($localStorage.userData){
      $cordovaGeolocation
        .getCurrentPosition({timeout: 5000, enableHighAccuracy: false})
        .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log("lat", lat);
          console.log("long", long);
          $http.post($rootScope.mobileFacadeURL + '/api/checkin/getcheckin?latitude=' + lat + '&longitude=' + long + '&distance=' +  $rootScope.distance + '&currentFbId=' + $localStorage.userData.fbId, {access_token: $localStorage.access_token})
            .then(function(resp){
              console.log(resp.data);
              $rootScope.userResults = resp.data;
              console.log('$rootScope.userResults', $rootScope.userResults);
            })
          });
    }
  };


  loadNearbyUsers();
  $rootScope.login = false;
  
  $scope.storedMessages = $rootScope.storedMessages;

  $scope.sendMessage = function(userId, userInfo) {
    // $scope.$apply(function() {
    $scope.currentTime = Date.now();
    // $rootScope.
    // })
    console.log('userId in sendMessage', userId);
    if(userId) {

      // checks if the userId matches up with anything in the userChats object. if it doesn't, go straight to chat. if it does, pull up existing chat (get request to database). 

      console.log('inside userId if function')
      $rootScope.currentUserId = $localStorage.userData.fbId;
      var currentUserIdVar = $rootScope.currentUserId;
      console.log('currentUserIdVar', currentUserIdVar);
      $rootScope.selectedUserToMsg = userId;
      $rootScope.selectedUserToMsgInfo = userInfo;
      console.log('$rootScope.selectedUserToMsgInfo:', $rootScope.selectedUserToMsgInfo);

      $rootScope.selectedChatId = currentUserIdVar.concat($scope.currentTime);
      // for (var i = 0 ; i < user_attributes)
      console.log('Date.now():', Date.now());
      // var newChatId = userResults.id + Date.now();
      // console.log('newChatId', newChatId);

      // $location.path('/#/chatDetail/' + newChatId);
      console.log('$rootScope.selectedUserToMsg:', $rootScope.selectedUserToMsg);
      // $state.go('chat', {userId:userId});
    }
    // $state.go('chatDetail', );


  };


  
  
  // dummy demo data
  // $scope.userResults = [{ 
  //                     username: "Lina", 
  //                     profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11110530_10206522392155533_3913495922613816060_n.jpg?oh=161d0b56a17c1139362dccc3f7e5c4bf&oe=565F6768", 
  //                     id: 123,
  //                     distanceMiles: 7,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['JavaScript', 'MongoDB', 'AngularJS'],
  //                     activities: ['Running', 'Coffee']
  //                   },
  //                   { 
  //                     username: "James", 
  //                     profilePic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c34.45.421.421/s200x200/396766_10151064735060720_1730615221_n.jpg?oh=904ec6c8be1a347a167d980a0dc10be0&oe=5671C719&__gda__=1449609301_74bdc97dffb067f21d0cced359a5f957", 
  //                     id: 123,
  //                     distanceMiles: 28,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['Mappa Mercia', 'The Guardian', 'Small Answers'],
  //                     activities: ['Biking', 'Coffee']
  //                   },
  //                   { 
  //                     username: "Rene", 
  //                     profilePic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p200x200/10805808_10152347290831734_4010306437546039993_n.jpg?oh=58cd203d851b93ce9c004afd1dc914f1&oe=5664495C&__gda__=1449158537_f8dcc05f5b63264ee09d7603db394f9d", 
  //                     id: 123,
  //                     distanceMiles: 16,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['Salsalito Taco Shop', 'Radio Bio Bio', 'CrossFit'],
  //                     activities: ['Gym', 'Food']
  //                   },
  //                   { 
  //                     username: "Omar", 
  //                     profilePic: "https://avatars0.githubusercontent.com/u/11527433?v=3&s=460", 
  //                     id: 123,
  //                     distanceMiles: 2,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['Node.js', '9GAG', 'Eclipse'],
  //                     activities: ['Food', 'Boardgames']
  //                   },

  //                   { 
  //                     username: "Angela", 
  //                     profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hprofile-xat1/v/t1.0-1/p200x200/11407200_10152972882898295_4575315031086192909_n.jpg?oh=44b6dd12893e8a2937b7cc80b848ab3e&oe=5660A399", 
  //                     id: 123,
  //                     distanceMiles: 20,
  //                     distanceKm: 14,
  //                     likes: ['Disney','Kungfu Panda','NEAFL'],
  //                     likesTopThree: ['Disney','Kungfu Panda','NEAFL'],
  //                     activities: ['Movies', 'Biking']
  //                   },
  //                   { 
  //                     username: "Cecilia", 
  //                     profilePic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c127.4.631.631/s200x200/10644983_10204301562481851_1253094813190192655_n.jpg?oh=07558c2792c93671d77d59ae8527832f&oe=567664EE&__gda__=1450951659_9dfe9f2e371328226dd9f48c636a1162", 
  //                     id: 123,
  //                     distanceMiles: 2,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['Food', 'Anaesthetic Registrar', 'Tiffany & Co'],
  //                     activities: ['Coffee', 'Boardgames']
  //                   },
  //                   { 
  //                     username: "Bo", 
  //                     profilePic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/c171.29.367.367/s200x200/430078_380741835286517_1740697486_n.jpg?oh=b1ea09b6855b3e637dbaf77a83c06a3d&oe=565E7C26&__gda__=1450093701_0b01ee5be9d1d8a2b2d7e342bb0496ce", 
  //                     id: 123,
  //                     distanceMiles: 50,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['Texas Holdem Poker', 'Uq Brisbane', 'Engineering Memes'],
  //                     activities: ['Boardgames', 'Gym']
  //                   },
  //                   { 
  //                     username: "Dominic", 
  //                     profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/10696447_10152586879849270_5701389853211351443_n.jpg?oh=384cac7c258f0c30d57132fceb6fb5b4&oe=565FCE74", 
  //                     id: 123,
  //                     distanceMiles: 19,
  //                     distanceKm: 14,
  //                     likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
  //                     likesTopThree: ['Kinder', 'Snoopy', 'Vapiano Brisbane'],
  //                     activities: ['Food', 'Movies']
  //                   }
  //                   ];                    

    
  setInterval(function(){
    loadNearbyUsers();
  }, 5000);              


});



// add extra line at end












