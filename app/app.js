'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider,
	$routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/', {
			templateUrl: 'login/login.html'
		})
		.when('/view1', {
			resolve: {
				"check": function ($location, $rootScope) {
					if (!$rootScope.loggedIn) {
						$location.path('/');
					}
				}
			},
			templateUrl: 'view1/view1.html'
		})
		.when('/view2', {
			resolve: {
				"check": function ($location, $rootScope) {
					if (!$rootScope.loggedIn) {
						$location.path('/');
					}
				}
			},
			templateUrl: 'view2/view2.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.controller('loginController', ($scope, $location, $rootScope) => {
	$scope.submit = function () {
		var uname = $scope.username;
		var upassword = $scope.password;

		if (uname == 'admin' && upassword == 'admin') {
			$rootScope.loggedIn = true;
			$location.path('/view1');
		} else {
			alert('Wrong id (try username: admin & password: admin)');
		}
	};

	$scope.logout = function () {
		$rootScope.loggedIn = false;
		$location.path('/');
	}
})
