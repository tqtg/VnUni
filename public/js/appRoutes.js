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

		.when('/uni/xemdiemchuan', {
			templateUrl: 'views/partials/uni_xemdiemchuan.html',
			controller: 'UniController'	
		})
    
        .when('/uni/khoadaotao', {
			templateUrl: 'views/partials/uni_khoadaotao.html',
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