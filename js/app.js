'use strict';
var ryhave = angular.module('ryhave', ['ngRoute', 'duScroll', 'ngAnimate']);

ryhave.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {
    templateUrl: 'pages/home.html',
    controller: 'mainController'
  }).when('/sagsgang', {
    templateUrl: 'pages/sagsgang.html',
    controller: 'sagsgangController'
  }).when('/om', {
    templateUrl: 'pages/om.html'
  }).when('/pris', {
    templateUrl: 'pages/pris.html'
  }).when('/faq', {
    templateUrl: 'pages/faq.html'
  }).when('/:prefix', {
    templateUrl: 'pages/kontakt.html',
    controller: 'contactController'
  }).otherwise({
    redirectTo: '/'
  });
  // $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
});

ryhave.controller('NavCtrl', function($scope, $location, $document, $window) {
  $scope.isActive = function (viewLocation) { 
    console.log(viewLocation);
    return viewLocation === $location.path();
  };
  $scope.toTheTop = function() {
    $document.scrollTopAnimated(0).then(function() { 
      console && console.log('You just scrolled to the top!');
    });
  }
  $scope.navbarItemClicked = function(){
    if ($window.matchMedia("(max-width: 767px)").matches) {
      $(".navbar-toggle").click();
    }
    $scope.toTheTop();
  }
});

ryhave.controller('mainController', function($scope, $location) {

});

ryhave.controller('sagsgangController', function($scope, $document){
  $scope.toTheTop = function() {
    $document.scrollTopAnimated(0).then(function() { 
      console && console.log('You just scrolled to the top!');
    });
  }
}
).value('duScrollOffset', 154);

ryhave.controller('contactController', function ($scope, $http) {
  $scope.result = 'hidden'
  $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
      $scope.submitted = true;
      $scope.submitButtonDisabled = true;
      if (contactform.$valid) {
        $http({
          method  : 'POST',
          url     : 'php/contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
              }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                  $scope.submitButtonDisabled = true;
                  $scope.resultMessage = data.message;
                  $scope.result='bg-success';
                } else {
                  $scope.submitButtonDisabled = false;
                  $scope.resultMessage = data.message;
                  $scope.result='bg-danger';
                }
              });
            } else {
              $scope.submitButtonDisabled = false;
              $scope.resultMessage = 'Fejl. Udfyld venligst alle felterne.';
              $scope.result='bg-danger';
            }
          }
        });