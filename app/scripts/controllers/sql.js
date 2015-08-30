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
      console.log("posting: " + query);
    	$http.post('http://sql.civic.buzz:8099', query).then(
    		function(response) {
          console.log("Got response");
          console.log(response);
    			if (response.status==200) {
    				alert("Sweet success!","success");
	    			$scope.results = {
	    				fields:[],
	    				rows:[]
	    			};
            for (var key in response.data.rows[0]) {
              $scope.results.fields.push(key);
            }
	    			for (var i=0; i<response.data.rows.length; i++) {
              $scope.results.rows.push([]);
	    				for (var key in response.data.rows[i]) {
                console.log(key);
	    					$scope.results.rows[i].push(response.data.rows[i][key]);
	    				}
	    			}
            console.log($scope.results)
    			} else {
            console.log(response);
    				alert("Wuh oh! " + response.data.error);
    			}

    		},
    		function(response) {
          console.log(response);
    			alert("Wuh oh! " + response.data.error,"danger");
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