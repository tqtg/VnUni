angular.module('DBCtrl', []).
controller('ListUniController', function($scope, $http) {					
	$http.get("/ds_truong").success(
		function(response){
			$scope.ds_truong = response;
		}		
	);	

}).
controller('EditUniController', function($scope, $http, $routeParams) {						
	$scope.school_id = $routeParams.school_id;
	$scope.url = "/uni/"+$scope.school_id;	
	$http.get($scope.url).success(
		function(response){
			$scope.school = response;						
		}		
	);		

});
