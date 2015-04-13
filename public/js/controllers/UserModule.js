angular.module('UserModule', []).
controller('LoginController', function($scope, $http, $window) {					
	$scope.login = function(username, password){
		$http.post("/authenticate",{'username': username, 'password': password}).
		success(function(response){			
			if (response.status == 'NO'){
				$window.location.href="/login"
			} else 
			if (response.status == 'YES' && response.user_type == 'admin'){
				$window.location.href="/dbpanel"
			} else {
				$window.location.href="/edit_db/"+response.school;
			}
		}).
		error(function(response){
			alert(response);
		});		
	}	
});
