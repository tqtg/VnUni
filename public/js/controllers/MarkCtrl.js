angular.module('MarkCtrl', ['MarkService'])
.controller('MarkController', function($rootScope, $scope, ngDialog, usSpinnerService, loadUniversityService, loadMarkService) {
	$scope.showResult = false;
	$scope.showLoading = false;
	$scope.uniId = 0;
	$scope.uniSelected = function(selected) {
        if (typeof selected !== 'undefined') {
            $scope.uniId = selected.originalObject.id;
        }
    }

    //  Load universities
    $scope.universities = loadUniversityService.query({}, function() {});

    $scope.getUniMark = function() {
    	if ($scope.uniId == 0) {
    		ngDialog.open({
                template: '<h3>Hãy chọn trường bạn muốn xem!</h3>',
                plain: 'true',
                className: 'ngdialog-theme-default custom-width'
            });    		
    	} else {
    		usSpinnerService.spin('spinner-2');
    		$scope.showResult = false;
    		$scope.showLoading = true;
    		$scope.uniMajors = loadMarkService.query({id: $scope.uniId}, function() {
    			$scope.showLoading = false;
    			$scope.showResult = true;
    			$scope.majors = $scope.uniMajors[0].majors;
    			for (var i = 0; i < $scope.majors.length; i++) {
    				var division = "";
    				for (var j = 0; j < $scope.majors[i].divisions.length; j++) {
    					division += String($scope.majors[i].divisions[j] + ", ");
    				}
    				$scope.majors[i].divisions = division.substring(0, division.length - 2);
    			}
    		});
    	}
    };
});