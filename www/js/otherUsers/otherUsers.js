'use strict';

angular.module('ionicApp.otherUsers', [])

.controller('otherUsersCtrl', function($scope, $state, $rootScope) {
  $rootScope.login = false;
  $scope.userInfo = { 
                      username: "Lina", 
                      profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11110530_10206522392155533_3913495922613816060_n.jpg?oh=161d0b56a17c1139362dccc3f7e5c4bf&oe=565F6768", 
                      id: 123,
                      distanceMiles: 7,
                      distanceKm: 14,
                      likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
                      likesTopThree: ['JavaScript', 'MongoDB', 'AngularJS'],
                      activities: ['Running', 'Coffee']
                    };

  $scope.userResults = [{ 
                      username: "Lina", 
                      profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11110530_10206522392155533_3913495922613816060_n.jpg?oh=161d0b56a17c1139362dccc3f7e5c4bf&oe=565F6768", 
                      id: 123,
                      distanceMiles: 7,
                      distanceKm: 14,
                      likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
                      likesTopThree: ['JavaScript', 'MongoDB', 'AngularJS'],
                      activities: ['Running', 'Coffee']
                    },
                    { 
                      username: "Angela", 
                      profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hprofile-xat1/v/t1.0-1/p200x200/11407200_10152972882898295_4575315031086192909_n.jpg?oh=44b6dd12893e8a2937b7cc80b848ab3e&oe=5660A399", 
                      id: 123,
                      distanceMiles: 20,
                      distanceKm: 14,
                      likes: ['Disney','Kungfu Panda','NEAFL'],
                      likesTopThree: ['Disney','Kungfu Panda','NEAFL'],
                      activities: ['Movies', 'Biking']
                    },
                    { 
                      username: "Cecilia", 
                      profilePic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c127.4.631.631/s200x200/10644983_10204301562481851_1253094813190192655_n.jpg?oh=07558c2792c93671d77d59ae8527832f&oe=567664EE&__gda__=1450951659_9dfe9f2e371328226dd9f48c636a1162", 
                      id: 123,
                      distanceMiles: 2,
                      distanceKm: 14,
                      likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
                      likesTopThree: ['Food', 'Anaesthetic Registrar', 'Tiffany & Co'],
                      activities: ['Coffee', 'Boardgames']
                    },
                    { 
                      username: "Bo", 
                      profilePic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/c171.29.367.367/s200x200/430078_380741835286517_1740697486_n.jpg?oh=b1ea09b6855b3e637dbaf77a83c06a3d&oe=565E7C26&__gda__=1450093701_0b01ee5be9d1d8a2b2d7e342bb0496ce", 
                      id: 123,
                      distanceMiles: 50,
                      distanceKm: 14,
                      likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
                      likesTopThree: ['Texas Holdem Poker', 'Uq Brisbane', 'Engineering Memes'],
                      activities: ['Boardgames', 'Gym']
                    },
                    { 
                      username: "Dominic", 
                      profilePic: "https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/10696447_10152586879849270_5701389853211351443_n.jpg?oh=384cac7c258f0c30d57132fceb6fb5b4&oe=565FCE74", 
                      id: 123,
                      distanceMiles: 19,
                      distanceKm: 14,
                      likes: ['JavaScript', 'MongoDB', 'AngularJS', 'I <3 Programming', 'Texas Holdem Poker', ''],
                      likesTopThree: ['Kinder', 'Snoopy', 'Vapiano Brisbane'],
                      activities: ['Food', 'Movies']
                    }
                    ];                    

});

// add extra line at end
