angular.module('HomeService', [])
.factory('loadFiltersService', ['$resource', function($resource) {
    return $resource('/data/filter.json');
}]);