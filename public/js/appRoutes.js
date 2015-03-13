angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/partials/home.html',
			controller: 'HomeController'
		})

		.when('/uni/thongtin', {
			templateUrl: 'views/partials/uni_thongtin.html',
			controller: 'UniController'
		})

		.when('/uni/diemchuan', {
			templateUrl: 'views/partials/uni_diemchuan.html',
			controller: 'UniController'	
		})
    
        .when('/uni/khoa', {
			templateUrl: 'views/partials/uni_khoa.html',
			controller: 'UniController'	
		})
    
        .when('/uni/:id', {
			templateUrl: 'views/partials/uni_thongtin.html',
			controller: 'UniController'	
		})
    
        .otherwise({
            redirecTo: '/'
        });

	$locationProvider.html5Mode(true);

}]);