'use strict';

// directive to allow message to send upon pressing 'Go' on native keyboard.

angular.module('ionicApp.directives', [])
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter);
        })
        event.preventDefault();
      }
    });
  };
});

//add extra line at the end
