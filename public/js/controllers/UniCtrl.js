angular.module('UniCtrl', ['UniService'])
.controller('UniController', function($rootScope, $scope, $routeParams, getUniInforService) {
	if (typeof $rootScope.uniInfor === 'undefined') {
		$rootScope.uniId = String($routeParams.id);
		$rootScope.uniInfor = getUniInforService.query({id: $rootScope.uniId}, function() {
			$rootScope.uniInfor = $rootScope.uniInfor[0];
			console.log($rootScope.uniInfor);
			for (var i = 0; i < $rootScope.uniInfor.majors.length; i++) {
				var division = "";
				for (var j = 0; j < $rootScope.uniInfor.majors[i].divisions.length; j++) {
					division += String($rootScope.uniInfor.majors[i].divisions[j] + ", ");
				}
				$rootScope.uniInfor.majors[i].divisions = division.substring(0, division.length - 2);
			}
		});
	}
});
