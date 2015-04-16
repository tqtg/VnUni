angular.module('UniCtrl', ['UniService'])
.controller('UniController', function($rootScope, $scope, $routeParams, getUniInforService) {
	console.log($routeParams.id);
	$scope.uniId = String($routeParams.id);
	$rootScope.uniInfor = getUniInforService.query({id: $scope.uniId}, function() {
		$scope.uniInfor = $scope.uniInfor[0];
		console.log($scope.uniInfor);
		for (var i = 0; i < $scope.uniInfor.majors.length; i++) {
			var division = "";
			for (var j = 0; j < $scope.uniInfor.majors[i].divisions.length; j++) {
				division += String($scope.uniInfor.majors[i].divisions[j] + ", ");
			}
			$scope.uniInfor.majors[i].divisions = division.substring(0, division.length - 2);
		}
	});
});
