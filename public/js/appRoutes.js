angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/uni/:id/thongtin', {
			templateUrl: 'views/uni_thongtin.html',
			controller: 'UniController'
		})

        .when('/uni/:id/khoadaotao', {
			templateUrl: 'views/uni_khoadaotao.html',
			controller: 'UniController'	
		})    
    
		.when('/uni/:id/xemdiemchuan', {
			templateUrl: 'views/uni_xemdiemchuan.html',
			controller: 'UniController'	
		})
    
        .when('/uni/:id/tuyensinh', {
			templateUrl: 'views/uni_tuyensinh.html',
			controller: 'UniController'	
		})
        
        .when('/uni/:id/lienhe', {
			templateUrl: 'views/uni_lienhe.html',
			controller: 'UniController'	
		})
    
        .when('/uni/:id', {
			templateUrl: 'views/uni_thongtin.html',
			controller: 'UniController'	
		})
    
        .when('/dbpanel', {
            templateUrl: 'views/db_panel.html',
            controller: 'DBController'
    })
        .otherwise({
            redirecTo: '/'
        });

	$locationProvider.html5Mode(true);

}]);