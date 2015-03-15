angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$http', function($scope, $http) {
    $scope.getUni = function() {
        $http.get('/uni/QHI').success(function(data) {
            console.log(data);
        })
    }
}]);
