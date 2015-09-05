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

});

// add extra line at end
