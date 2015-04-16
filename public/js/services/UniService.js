angular.module('UniService', ['ngResource'])
.factory('getUniInforService', function($resource) {
	return $resource('/infor/:id/:need', {}, {
		query: {method: 'GET', isArray: true}
	})
});