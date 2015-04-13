angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/uni/thongtin', {
			templateUrl: 'views/uni_thongtin.html',
			controller: 'UniController'
		})

        .when('/uni/khoadaotao', {
			templateUrl: 'views/uni_khoadaotao.html',
			controller: 'UniController'	
		})    
    
		.when('/uni/xemdiemchuan', {
			templateUrl: 'views/uni_xemdiemchuan.html',
			controller: 'UniController'	
		})
    
        .when('/uni/tuyensinh', {
			templateUrl: 'views/uni_tuyensinh.html',
			controller: 'UniController'	
		})
        
        .when('/uni/lienhe', {
			templateUrl: 'views/uni_lienhe.html',
			controller: 'UniController'	
		})
    
        .when('/uni/:id', {
			templateUrl: 'views/uni_thongtin.html',
			controller: 'UniController'	
		})

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'DBController'
        })

        .when('/dbpanel', {
            templateUrl: 'views/ds_truong.html',
            controller: 'ListUniController'
        })

        .when('/edit_db/:school_id', {
            templateUrl: 'views/db_panel.html',
            controller: 'EditUniController'
        })        

        .when('/diemchuan', {
            templateUrl: 'views/diemchuan.html',
            controller: 'HomeController'
        })

        .when('/test', {
            templateUrl: 'views/test.html',
            controller: 'HomeController'
        })

        .otherwise({
            redirecTo: '/'
        });

	$locationProvider.html5Mode(true);

}]);