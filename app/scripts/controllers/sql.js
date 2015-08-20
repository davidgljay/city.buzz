'use strict';
/**
 * @description
 * # SQLCtrl
 * Provides access to restricted SQL queries
 */

 //Post a SQL query and return results.

 angular.module('cityadminApp')
  .controller('SQLCtrl', function ($scope, $http, Auth, $timeout) {
    $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };

    $scope.sqlpost = function(query) {
    	$http.post('http://api.civic.buzz:8099',query).then(
    		function(response) {
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
    				alert("Wuh oh! " response.code + ": " + response.body,"error");
    			}

    		},
    		function(response) {
    			alert("Wuh oh! " response.code + ": " + response.body,"error");
    		});
    };

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    };
  }