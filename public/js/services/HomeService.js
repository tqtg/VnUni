angular.module('HomeService', ['ngResource'])
.factory('loadFilterService', function($resource) {
	return $resource('/filter/:name', {}, {
		query: {method: 'GET', isArray: true}
	})
})
.factory('searchService', function($resource) {
    return $resource('/search', {}, {
        query: { method: 'GET', isArray: true}
    });
})
.factory('searchWithTagsService', function($resource) {
    return $resource('/searchwithtags', {}, {
        query: { method: 'GET', isArray: true}
    });
});