'use strict';
/**
 * @ngdoc function
 * @name cityadminApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('cityadminApp')
  .controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.cities = $firebaseArray(Ref.child('cities'));

    // display any errors
    $scope.cities.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addCity = function(cityName, cityUrl) {
        $scope.cities.$add({name: cityName, url:cityUrl})
          // display any errors
          .catch(alert);
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
