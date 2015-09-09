'use strict';

angular.module('ionicApp.login', [])

.controller('LoginCtrl', function($scope, $state, $ionicSlideBoxDelegate, $rootScope, $cordovaOauth, $localStorage, $http, $cordovaFacebook) {
  $rootScope.login = true;

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };


  $scope.loggingInFb = function() {
    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
      .then(function(success) {
        console.log('success:', success);
        // { id: "634565435",
        //   lastName: "bob"
        //   ...
        // }
      }, function (error) {
        // error
      });
    
  }


  var options = {
    method: "feed",
    link: "http://example.com",
    caption: "Such caption, very feed."
  };
  $cordovaFacebook.showDialog(options)
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });


  $cordovaFacebook.api("me", ["public_profile"])
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });


  $cordovaFacebook.getLoginStatus()
    .then(function(success) {
      /*
      { authResponse: {
          userID: "12345678912345",
          accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
          session_Key: true,
          expiresIn: "5183738",
          sig: "..."
        },
        status: "connected"
      }
      */
    }, function (error) {
      // error
    });

  $cordovaFacebook.getAccessToken()
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });

  $cordovaFacebook.logout()
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });







  // $scope.loggingInFb = function() {
  //   $cordovaOauth.facebook("840774716036629", ["email", "user_likes", "user_friends", "user_photos"]).then(function(result) {

  //       console.log('cordovaOatuhResult',result); // access token and expires_in
  //       $http.post('http:// :3000/api/auth/facebook', {access_token: result.access_token})
  //         .then(function(userDataInfo){
  //           console.log('userDataInfo from FB:',userDataInfo);
  //           $localStorage.userData = userDataInfo.data;
  //           $localStorage.access_token = result.access_token;
  //           $state.go("selectActivity");
  //         });

  //   }, function(error) {
  //       alert("There was a problem signing in!  See the console for logs");
  //       console.log(error);
  //   });
  // };

  $scope.loggingInTwitter = function() {
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});

// add extra line at end
