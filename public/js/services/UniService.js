angular.module('UniService', ['ngResource'])
.factory('getUniInforService', function($resource) {
	return $resource('/infor/:id', {}, {
		query: {method: 'GET', isArray: true}
	})
});