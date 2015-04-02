angular.module('HomeService', ['ngResource'])
.factory('loadFilterService', function($resource) {
	return $resource('/filter/:name', {}, {
		query: {method: 'GET', isArray: true}
	})
})
.factory('searchService', function($resource) {
    return $resource('/search', {}, { 
        search: { method: "GET", isArray: true}
    });
});