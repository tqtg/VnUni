angular.module('HomeService', ['ngResource'])
.factory('loadFilterService', function($resource) {
    return $resource('/data/filter.json', {}, {
        query: { method: "GET" }
    });
})
.factory('searchService', function($resource) {
    return $resource('data/uni.json', {}, { 
        search: { method: "GET", isArray: true}
    });
});