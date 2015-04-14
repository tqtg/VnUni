// angular.module('MarkCtrl', ['HomeService'])
// .controller('MarkController', function($rootScope, $scope, $filter, ngDialog, usSpinnerService, loadFilterService, searchService) {
//     $scope.showResult = false;
//     $scope.mucdiemThap = null;
//     $scope.mucdiemCao = null;
//     $scope.nganhhocSelected = function(selected) {
//         if (typeof selected === 'undefined') {
//             $scope.nganhhoc = {id: 0, name: ""};
//         } else {
//             $scope.nganhhoc = selected.originalObject;
//         }
//     }

//     //  Load data for filter
//     $scope.filter = {};
//     $scope.filter.nganhhoc = loadFilterService.query({name: 'nganhhoc'}, function() {});
//     $scope.filter.khoithi = loadFilterService.query({name: 'khoithi'}, function() {
//         $scope.khoithi = $scope.filter.khoithi[0];
//     });
//     $scope.filter.vungmien = loadFilterService.query({name: 'vungmien'}, function() {
//         $scope.vungmien = $scope.filter.vungmien[0];
//     });
//     $scope.filter.thanhpho = loadFilterService.query({name: 'thanhpho'}, function() {
//         $scope.thanhpho = $scope.filter.thanhpho[0];
//     });
//     $scope.filter.loaitruong = loadFilterService.query({name: 'loaitruong'}, function() {
//         $scope.loaitruong = $scope.filter.loaitruong[0];
//     });
//     // console.log($scope.filter);

//     //	Search university
//     //	Invoke searchService
//     $scope.search = function() {
//         // console.log($scope.mucdiemThap)
//         var min = 0;
//         var max = 30;
//         if (typeof $scope.mucdiemThap !== 'undefined' && typeof $scope.mucdiemCao !== 'undefined') {
//             if ($scope.mucdiemThap !== null && $scope.mucdiemCao !== null
//                 && $scope.mucdiemThap > $scope.mucdiemCao) {
//                 alert("Mức điểm bạn đã nhập chưa hợp lý!")
//             } else {
//                 if ($scope.mucdiemThap !== null) min = $scope.mucdiemThap;
//                 if ($scope.mucdiemCao !== null) max = $scope.mucdiemCao;
//                 $scope.showResult = false;
//                 usSpinnerService.spin('spinner-1');

//                 $rootScope.universities = searchService.query({
//                     //  Parameters are taken from filter
//                     nganhhoc: (typeof $scope.nganhhoc === 'undefined') ? 0 : $scope.nganhhoc.id,
//                     khoithi: (typeof $scope.khoithi === 'undefined') ? 0 : $scope.khoithi.id,
//                     vungmien: (typeof $scope.vungmien === 'undefined') ? 0 : $scope.vungmien.id,
//                     thanhpho: (typeof $scope.thanhpho === 'undefined') ? 0 : $scope.thanhpho.id,
//                     loaitruong: (typeof $scope.loaitruong === 'undefined') ? 0 : $scope.loaitruong.id,
//                     mucdiemThap: min,
//                     mucdiemCao: max
//                 }, function() {
//                     var nUni = $rootScope.universities.length;
//                     console.log(nUni + " universities found")
//                     if (nUni == 0) {
//                         alert("Không tìm được trường nào phù hợp!");
//                         $scope.showResult = false;
//                     } else {
//                         $scope.showResult = true;
//                     }
//                     usSpinnerService.stop('spinner-1');
//                 });
//             }
//         }
//     };

//     $scope.getUni = function() {
//         ngDialog.open({
//             template: 'views/dialog.html',
//             className: 'ngdialog-theme-default custom-width'
//         });
//         // $http.get('/uni/QHI').success(function(data) {
//         //     console.log(data);
//         // });
//     }
// });