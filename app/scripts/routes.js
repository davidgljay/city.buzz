'use strict';
/**
 * @ngdoc overview
 * @name cityadminApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 */
angular.module('cityadminApp')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);
