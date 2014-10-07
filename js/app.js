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
    controller: 'mainController'
  }).otherwise({
    redirectTo: '/'
  });
  // $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
});

ryhave.controller('NavCtrl', function($scope, $location, $document) {
    $scope.isActive = function (viewLocation) { 
      console.log(viewLocation);
        return viewLocation === $location.path();
    };
    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0).then(function() { 
        console && console.log('You just scrolled to the top!');
      });
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