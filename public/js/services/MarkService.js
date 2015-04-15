angular.module('MarkService', ['ngResource'])
.factory('loadUniversityService', function($resource) {
	return $resource('/mark', {}, {
		query: {method: 'GET', isArray: true}
	})
})
.factory('loadMarkService', function($resource) {
	return $resource('/mark/:id', {}, {
		query: {method: 'GET', isArray: true}
	})
});