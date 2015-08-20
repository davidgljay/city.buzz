'use strict';
/**
 * @ngdoc function
 * @name cityadminApp.controller:ChatCtrl
 * @description
 * # CityCntrl
 * Manage cities searched by climatescrape
 */

//Todo: add controller which calls elasticsearch db with query.
//Returns: City, link, snippet of text.
//Should I just leave the endpoint exposed? Probably fine for now. Easy enough to put it behind some auth with permissions if I need to.

angular.module('cityadminApp')
  .controller('AdminCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.cities = $firebaseArray(Ref.child('cities'));
    $scope.media = $firebaseArray(Ref.child('media'));
    $scope.publications = $firebaseArray(Ref.child('publications'));

    // display any errors
    $scope.cities.$loaded().catch(alert);
    $scope.media.$loaded().catch(alert);
    $scope.publications.$loaded().catch(alert);

    $scope.type="cities";

    // provide a method for adding a message
    $scope.addItem = function(name, url) {
        $scope[$scope.type].$add({name: name, url:url})
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
