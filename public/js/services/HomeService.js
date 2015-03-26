angular.module('HomeService', ['ngResource'])
.factory('loadFilterService', function($resource) {
    return $resource('/data/filter.json', {},
    {
        loadAll: {
            method: 'GET'
        }
    });
})
.factory('searchService', function($resource) {
    return $resource('/search', {}, { 
        search: {
            method: 'GET'
        }
    });
});