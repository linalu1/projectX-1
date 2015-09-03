angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })
  .state('selectActivity', {
    url: '/selectActivity',
    templateUrl: 'templates/selectActivity.html',
    controller: 'selectActivityCtrl'
  });

  $urlRouterProvider.otherwise("/");

})
.controller('selectActivityCtrl', function($scope, $state) {
  $scope.toLogin = function(){
    $state.go('login');
  }
  $scope.user = {
    firstName: ''
  };

})


.controller('LoginCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.loggingInFb = function() {
    $state.go('selectActivity');
  };
  $scope.loggingInTwitter = function() {
    $state.go('selectActivity');
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
})

.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  $scope.toLogin = function(){
    $state.go('login');
  }
})

.directive('ionMdInput', function(){
  return {
    restrict: 'E',
    transclude: true,
    template:
      '<input type="text" required>'+
      '<span class="md-highlight"></span>'+
      '<span class="md-bar"></span>'+
      '<label>{{label}}</label>',
    scope: {
      'label': '@'
    }
  }
});


