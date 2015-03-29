angular.module('HomeService', ['ngResource'])
.factory('loadFilterService', function($resource) {
    return {
    	nganhhoc: $resource('/filter/nganhhoc', {}, {
        	query: { method: "GET", isArray: true}
    	}),
    	khoithi: $resource('/filter/khoithi', {}, {
        	query: { method: "GET", isArray: true}
    	}),
    	mucdiem: $resource('/filter/mucdiem', {}, {
        	query: { method: "GET", isArray: true}
    	}),
    	vungmien: $resource('/filter/vungmien', {}, {
        	query: { method: "GET", isArray: true}
    	}),
    	thanhpho: $resource('/filter/thanhpho', {}, {
        	query: { method: "GET", isArray: true}
    	}),
    	loaitruong: $resource('/filter/loaitruong', {}, {
        	query: { method: "GET", isArray: true}
    	})
    };
})
.factory('searchService', function($resource) {
    return $resource('data/uni.json', {}, { 
        search: { method: "GET", isArray: true}
    });
});