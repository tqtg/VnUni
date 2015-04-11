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

    //	Search university
    //	Invoke searchService
    $scope.search = function() {
    	$rootScope.universities = searchService.search({
    		//	Parameters are taken from filter
            nganhhoc: (typeof $scope.nganhhoc === 'undefined') ? 0 : $scope.nganhhoc.id,
            khoithi: (typeof $scope.khoithi === 'undefined') ? 0 : $scope.khoithi.id,
            mucdiem: (typeof $scope.mucdiem === 'undefined') ? 0 : $scope.mucdiem.id,
            vungmien: (typeof $scope.vungmien === 'undefined') ? 0 : $scope.vungmien.id,
            thanhpho: (typeof $scope.thanhpho === 'undefined') ? 0 : $scope.thanhpho.id,
            loaitruong: (typeof $scope.loaitruong === 'undefined') ? 0 : $scope.loaitruong.id
    	}, function() {
            var nUni = $rootScope.universities.length;
            console.log(nUni + " universities found")
            if (nUni == 0) {
                alert("Not found!!!");
            }
        });
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
