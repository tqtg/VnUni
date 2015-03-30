angular.module('HomeService', ['ngResource'])
.factory('loadFilterService', function($resource) {
	return $resource('/filter/:name', {}, {
		query: {method: 'GET', isArray: true}
	})
})
.factory('searchService', function($resource) {
    return $resource('data/uni.json', {}, { 
        search: { method: "GET", isArray: true}
    });
});