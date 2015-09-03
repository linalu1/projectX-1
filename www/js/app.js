angular.module('ionicApp', ['ionic', 'ionicApp.login'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'js/login/login.html',
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


