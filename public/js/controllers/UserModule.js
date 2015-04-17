angular.module('UserModule', []).
controller('LoginController', function($scope, $http, $window) {					
	$scope.login = function(username, password){
		$http.post("/authenticate",{'username': username, 'password': password}).
		success(function(response){			
			console.log(response);
			$window.location.href=response;
		}).
		error(function(response){						
		});		
	}	
});
