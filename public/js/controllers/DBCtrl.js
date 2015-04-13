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
	$scope.type =1;
	$http.get($scope.url).success(
		function(response){
			$scope.school = response[0];									
			$scope.school.faculties = [];
		}		
	);		
	$http.get("/school_type").success(
		function(response){
			$scope.list_type =  response;			
		}		
	);			
	$http.get("/region").success(
		function(response){
			$scope.list_region =  response;			
		}		
	);				
	$http.get("/city").success(
		function(response){
			$scope.list_city =  response;			
		}		
	);						
	$scope.add_faculty = function(){
		$scope.school.faculties.push({id: $scope.school.faculties.length, name : "none", description: "none", majors: []});
	}
	$scope.rm_faculty = function(){
		$scope.school.faculties.pop();	
	}
	$scope.add_major = function(f_id){				
		var mj_id = $scope.school.faculties[0].majors.length;
		$scope.school.faculties[f_id].majors.push({id: mj_id, name: "none", divisions: [], admissionMarks: []});		
	}
	$scope.rm_major = function(f_id){
		$scope.school.faculties[f_id].majors.pop();
	}	
});

