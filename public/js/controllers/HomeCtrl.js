angular.module('HomeCtrl', ['HomeService'])
.controller('HomeController', function($rootScope, $scope, $filter, ngDialog, usSpinnerService, loadFilterService, searchService, searchWithTagsService) {
    $scope.showResult = false;
    $scope.mucdiemThap = null;
    $scope.mucdiemCao = null;
    $scope.nganhhocSelected = function(selected) {
        if (typeof selected === 'undefined') {
            $scope.nganhhoc = {id: 0, name: ""};
        } else {
            $scope.nganhhoc = selected.originalObject;
        }
    }

    //  Load data for filter
    $scope.filter = {};
    $scope.filter.nganhhoc = loadFilterService.query({name: 'nganhhoc'}, function() {});
    $scope.filter.khoithi = loadFilterService.query({name: 'khoithi'}, function() {
        $scope.khoithi = $scope.filter.khoithi[0];
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
    // console.log($scope.filter);
    
    $scope.loadTags = function($query) {
        var tags = [];
        for (var i = 0; i < $scope.filter.nganhhoc.length; i++) {
            var tag = $scope.filter.nganhhoc[i];
            tag.field = "M";
            tags.push(tag);
        }
        for (var i = 0; i < $scope.filter.khoithi.length; i++) {
            var tag = $scope.filter.khoithi[i];
            if (tag.id != 0) {
                tag.field = "D";
                tags.push(tag);
            }
        }
        for (var i = 0; i < $scope.filter.vungmien.length; i++) {
            var tag = $scope.filter.vungmien[i];
            if (tag.id != 0) {
                tag.field = "R";
                tags.push(tag);
            }
        }
        for (var i = 0; i < $scope.filter.thanhpho.length; i++) {
            var tag = $scope.filter.thanhpho[i];
            if (tag.id != 0) {
                tag.field = "C";
                tags.push(tag);
            }
        }
        for (var i = 0; i < $scope.filter.loaitruong.length; i++) {
            var tag = $scope.filter.loaitruong[i];
            if (tag.id != 0) {
                tag.field = "T";
                tags.push(tag);
            }
        }

        //  Shuffle tags
        for(var j, x, i = tags.length; i; j = Math.floor(Math.random() * i), x = tags[--i], tags[i] = tags[j], tags[j] = x);
        return tags.filter(function(tag) {
            return tag.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
    };

    //	Search university
    //	Invoke searchService
    function searchComplete() {
        var nUni = $rootScope.universities.length;
        console.log(nUni + " universities found")
        if (nUni == 0) {
            ngDialog.open({
                template: '<h3>Không tìm được trường nào phù hợp!</h3>',
                plain: 'true',
                className: 'ngdialog-theme-default custom-width'
            });
            $scope.showResult = false;
        } else {
            $scope.showResult = true;
        }
        usSpinnerService.stop('spinner-1');
    }

    $scope.search = function() {
        // console.log($scope.mucdiemThap)
        var min = 0;
        var max = 30;
        if (typeof $scope.mucdiemThap !== 'undefined' && typeof $scope.mucdiemCao !== 'undefined') {
            if ($scope.mucdiemThap !== null && $scope.mucdiemCao !== null
                && $scope.mucdiemThap > $scope.mucdiemCao) {
                ngDialog.open({
                    template: '<h3>Mức điểm bạn nhập chưa hợp lý!</h3>',
                    plain: 'true',
                    className: 'ngdialog-theme-default custom-width'
                });
            } else {
                if ($scope.mucdiemThap !== null) min = $scope.mucdiemThap;
                if ($scope.mucdiemCao !== null) max = $scope.mucdiemCao;
                $scope.showResult = false;
                usSpinnerService.spin('spinner-1');

                $rootScope.universities = searchService.query({
                    //  Parameters are taken from filter
                    nganhhoc: (typeof $scope.nganhhoc === 'undefined') ? 0 : $scope.nganhhoc.id,
                    khoithi: (typeof $scope.khoithi === 'undefined') ? 0 : $scope.khoithi.id,
                    vungmien: (typeof $scope.vungmien === 'undefined') ? 0 : $scope.vungmien.id,
                    thanhpho: (typeof $scope.thanhpho === 'undefined') ? 0 : $scope.thanhpho.id,
                    loaitruong: (typeof $scope.loaitruong === 'undefined') ? 0 : $scope.loaitruong.id,
                    mucdiemThap: min,
                    mucdiemCao: max
                }, searchComplete);
            }
        }
    };

    $scope.searchWithTags = function() {
        console.log($scope.tags);

        $scope.showResult = false;
        usSpinnerService.spin('spinner-1');
        var tagsParam = [];
        for (var i = 0; i < $scope.tags.length; i++) {
            tagsParam[i] = {};
            tagsParam[i].id = $scope.tags[i].id;
            tagsParam[i].field = $scope.tags[i].field;
        }
        $rootScope.universities = searchWithTagsService.query({
            tags: JSON.stringify(tagsParam)
        }, searchComplete);
    }

    $scope.getUni = function() {
        ngDialog.open({
            template: 'views/dialog.html',
            className: 'ngdialog-theme-default custom-width'
        });
        // $http.get('/uni/QHI').success(function(data) {
        //     console.log(data);
        // });
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
})
.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: 'green'});
}]);
