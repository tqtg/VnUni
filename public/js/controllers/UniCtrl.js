angular.module('UniCtrl', ['UniService'])
.controller('UniController', function($rootScope, $scope, $routeParams, $location, getUniInforService) {
	var url = $location.url();
	var needInfor = url.split('/')[2];
	$scope.uniId = String($routeParams.id);
	$scope.uniInfor = getUniInforService.query({id: $scope.uniId, need: needInfor}, function() {
		$scope.uniInfor = $scope.uniInfor[0];
		if ($rootScope.uniName != $scope.uniInfor.name) {
			$rootScope.uniName = $scope.uniInfor.name;
		}
		if (needInfor == 'xemdiemchuan') {
			for (var i = 0; i < $scope.uniInfor.majors.length; i++) {
				var division = "";
				for (var j = 0; j < $scope.uniInfor.majors[i].divisions.length; j++) {
					division += String($scope.uniInfor.majors[i].divisions[j] + ", ");
				}
				$scope.uniInfor.majors[i].divisions = division.substring(0, division.length - 2);
			}
		}
	});
});
