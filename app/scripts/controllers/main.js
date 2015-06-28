'use strict';

/**
 * @ngdoc function
 * @name cityadminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cityadminApp
 */
angular.module('cityadminApp')
  .controller('MainCtrl', function ($scope,$http) {
  	$scope.results = [];
  	$scope.search = function(query) {
  		// Get search results.
  		$scope.results=[];
  		$http.jsonp('http://54.85.208.63:9200/cities/_search?q='+encodeURIComponent(query) + '&size=100&callback=JSON_CALLBACK').
  			success(function(data, status, headers, config) {
  				$scope.stats = {
  					hits: data.hits.total
  				}
  				for (var i=0; i < data.hits.hits.length; i++){
  					var result = data.hits.hits[i];
	  				$scope.results.push( {
						title: result._source.title,
						description: getRelevantSentence(result._source.body.description, result._source.body.text,query),
						url: result._source.url,
						city:result._source.city_name
					})		
  				};

  			}). 
  			error(function(data, status, headers, config) {
  				console.log(status);
  			});

  		//TODO: Sort results by city.
		// Get stats
		// $scope.stats ={};
		// var statsreq = {
		//  method: 'POST',
		//  url: 'http://54.85.208.63:9200/cities/_search?q='+encodeURIComponent(query) + '&search_type=count&callback=JSON_CALLBACK',
		//  headers: {
		//    'Content-Type': 'application/json'
		//  },
		//  data: { 
		// 	  "aggs": {
		// 	    "cities": {
		// 	      "terms": {
		// 	        "field": "city_code"
		// 	      }
		// 	    }
		// 	  }
		//     }
		//  };

		// $http.jsonp(statsreq)
		// 	.success(function(data,status,headers,config) {
		// 		console.log(status);
		// 		console.log(data);
		// 	})
		// 	.error(function(data,status,headers,config) {
		// 		console.log(status);
		// 		console.log(data);
		// 	});
  	};

  	var getRelevantSentence = function(description, body, query) {
  		if (description && description.match(query)) {
  			return boldQuery(description,query);
  		} else if (body && body.match(query)) {
  			var splitSentences = body.split("\.");
  			for (var i = 0; i<splitSentences.lenth; i++) {
  				var sentence = splitSentences[i];
  				if (sentence.match(query)) {
  					return boldQuery(sentence,query);
  				}
  			}
  		}
  		return description;
  	}

  	var boldQuery = function(string, query) {
  		if (string) {
  			string = string.replace(RegExp('<.*>','g'),'');
	        return string.replace(RegExp(query, 'g'), '<strong>'+query+'</strong>');           
  		};
  	}
  });
