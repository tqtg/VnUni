angular.module('HomeCtrl', ['HomeService'])
.controller('HomeController', function($scope, $filter, loadFilterService, searchService) {
    //  Load data for filter
    $scope.filter = {};
    $scope.filter.nganhhoc = loadFilterService.nganhhoc.query();
    $scope.filter.khoithi = loadFilterService.khoithi.query();
    $scope.filter.mucdiem = loadFilterService.mucdiem.query();
    $scope.filter.vungmien = loadFilterService.vungmien.query();
    $scope.filter.thanhpho = loadFilterService.thanhpho.query();
    $scope.filter.loaitruong = loadFilterService.loaitruong.query();

    //  Search university
    $scope.search = function() {
        console.log("Searching ...");
        searchService.search(function(data) {
            $scope.universities = data;
        });
    }

    //	Search university
    //	Set default value of filter
    // var defaultValue = {
    // 	"id": "0"
    // }
    // $scope.nganhhoc = defaultValue;
    // $scope.khoithi = defaultValue;
    // $scope.mucdiem = defaultValue;
    // $scope.vungmien = defaultValue;
    // $scope.thanhpho = defaultValue;
    // $scope.loaitruong = defaultValue;
    // //	Invoke searchService
    // $scope.search = function() {
    // 	searchService.search( {
    // 		//	Parameters are taken from filter
    // 		nganhhoc: $scope.nganhhoc.id,
    // 		khoithi: $scope.khoithi.id,
    // 		mucdiem: $scope.mucdiem.id,
    // 		vungmien: $scope.vungmien.id,
    // 		thanhpho: $scope.thanhpho.id,
    // 		loaitruong: $scope.loaitruong.id
    // 	}, function() {
    // 		console.log('Searching ...');
    // 		console.log($scope.nganhhoc);
    // 		console.log($scope.khoithi);
    // 		console.log($scope.mucdiem);
    // 		console.log($scope.vungmien);
    // 		console.log($scope.thanhpho);
    // 		console.log($scope.loaitruong);
    // 	});
    // };


    $scope.getUni = function() {
        $http.get('/uni/QHI').success(function(data) {
            console.log(data);
        });
    }
});
