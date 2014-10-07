'use strict';
var ryhave = angular.module('ryhave', ['ngRoute']);

ryhave.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {
    templateUrl: 'pages/home.html',
    controller: 'mainController'
  }).when('/processen', {
    templateUrl: 'pages/processen.html',
    controller: 'processController'
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

ryhave.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
      console.log(viewLocation);
        return viewLocation === $location.path();
    };
  });

ryhave.controller('mainController', function($scope, $location) {

});