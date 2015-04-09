angular.module('HomeCtrl', ['HomeService'])
.controller('HomeController', function($rootScope, $scope, $filter, loadFilterService, searchService) {
    //  Load data for filter
    $scope.filter = {};
    $scope.filter.nganhhoc = loadFilterService.query({name: 'nganhhoc'}, function() {
        $scope.nganhhoc = $scope.filter.nganhhoc[0];
    });
    $scope.filter.khoithi = loadFilterService.query({name: 'khoithi'}, function() {
        $scope.khoithi = $scope.filter.khoithi[0];
    });
    $scope.filter.mucdiem = loadFilterService.query({name: 'mucdiem'}, function() {
        $scope.mucdiem = $scope.filter.mucdiem[0];
    });
    $scope.filter.vungmien = loadFilterService.query({name: 'vungmien'}, function() {
        $scope.vungmien = $scope.filter.vungmien[0];
    });
    $scope.filter.thanhpho = loadFilterService.query({name: 'thanhpho'}, function() {
        $scope.thanhpho = $scope.filter.thanhpho[0];
    });
    $scope.filter.loaitruong = loadFilterService.query({name: 'loaitruong'}, function() {
        $scope.loaitruong = $scope.filter.loaitruong[0];
    });


    console.log($scope.filter);
    // Search university
    // $scope.search = function() {
    //     console.log("Searching ...");
    //     console.log($scope.nganhhoc.id);
    //     console.log($scope.khoithi.id);
    //     console.log($scope.mucdiem.id);
    //     console.log($scope.vungmien.id);
    //     console.log($scope.thanhpho.id);
    //     console.log($scope.loaitruong.id);
    //     // searchService.search(function(data) {
    //     //     $scope.universities = data;
    //     // });
    // }

    //	Search university
    //	Invoke searchService
    $scope.search = function() {
    	$rootScope.universities = searchService.search({
    		//	Parameters are taken from filter
    		nganhhoc: $scope.nganhhoc.id,
    		khoithi: $scope.khoithi.id,
    		mucdiem: $scope.mucdiem.id,
    		vungmien: $scope.vungmien.id,
    		thanhpho: $scope.thanhpho.id,
    		loaitruong: $scope.loaitruong.id
    	});

        console.log($rootScope.universities);
    };


    $scope.getUni = function() {
        $http.get('/uni/QHI').success(function(data) {
            console.log(data);
        });
    }
})
.filter('thanhphoFilter', function() {
    return function(thanhphos, vungmien) {
        if (typeof vungmien === 'undefined') return thanhphos;
        else {
            if (vungmien.id == 0) return thanhphos;
            else {
                var filtered = [];
                filtered.push(thanhphos[0]);
                for (var i = 0; i < thanhphos.length; i++) {
                    if (thanhphos[i].region == vungmien.id) {
                        filtered.push(thanhphos[i]);
                    }
                }
                return filtered;
            }
        }
    }
})
.filter('nganhhocFilter', function() {
    return function(nganhhocs, tennganh) {
        if (typeof tennganh === 'undefined') return nganhhocs;
        else {
            var filtered = [];
            filtered.push(nganhhocs[0]);
            for (var i = 0; i < nganhhocs.length; i++) {
                if (nganhhocs[i].name.toLowerCase().includes(tennganh.toLowerCase())) {
                    filtered.push(nganhhocs[i]);
                }
            }
            return filtered;
        } 
    }
});
