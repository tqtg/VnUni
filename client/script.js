// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var GiapLvApp = angular.module('GiapLvApp', ['ngRoute']);

    // configure our routes
    GiapLvApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : './uni_info.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/khoa', {
                templateUrl : './uni_khoa.html',
                controller  : 'mainController'
            })

            // route for the contact page
            .when('/diemchuan', {
                templateUrl : './uni_diemchuan.html',
                controller  : 'mainController'
            });
    });

    // create the controller and inject Angular's $scope
    GiapLvApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

