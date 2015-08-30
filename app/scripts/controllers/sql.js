'use strict';
/**
 * @description
 * # SQLCtrl
 * Provides access to restricted SQL queries
 */

 //Post a SQL query and return results.

 angular.module('cityadminApp')
  .controller('SQLCtrl', function ($scope, $http, Auth, $timeout) {
    $scope.logout = function() { Auth.$unauth(); };
    $scope.messages = [];

    $scope.sqlpost = function(query) {
      console.log("posting");
    	$http.post('http://52.20.19.198:8099',query).then(
    		function(response) {
          console.log("Got response");
    			if (response.code==200) {
    				alert("Sweet success!","success");
	    			$scope.results = {
	    				fields:[],
	    				rows:[]
	    			};
	    			for (field in response.body.fields) {
	    				$scope.results.fields.push(field)
	    			}
	    			for (row in response.body.rows) {
	    				$scope.results.rows.push(row);
	    				for (key in row.keys()) {
	    					$scope.results.rows[-1].push(row[key]);
	    				}
	    			}
    			} else {
            console.log(JSON.stringify(response));
    				alert("Wuh oh! " + response + ": " + response.body,"danger");
    			}

    		},
    		function(response) {
    			alert("Wuh oh! " + response + ": " + response.body,"danger");
    		});
    };

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    };
  });