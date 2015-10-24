(function (ang) {
	
	var app = ang.module('app', []);

	app.controller('appController', function ($scope, $http, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
		$scope.methods.getUrlParams = function () {
			var p = {};
			var params = $window.location.search;
			params = params.substring( 1, params.length - (params[params.length-1]=='/') );
			params.split('&').forEach(function (_p) {
				p[ _p.split('=')[0] ] = _p.split('=')[1];
			});
			return p;
		}
		$scope.methods.redirectToApp = function (path) {
			var redirectQ = $scope.methods.getUrlParams().r;
			redirectQ += (redirectQ && redirectQ[redirectQ.length-1] != '/') ? '/' : '';
			redirectQ = redirectQ ? redirectQ + ($window.location.hash || '') : '';
			$window.location = redirectQ || '/platforms';
		}
		$scope.methods.submit = function () {
			$http.post('/auth/v1/login', {
				usernameOrEmail: $scope.models.usernameOrEmail,
				password: $scope.models.password,
			})
			// Success
			.then(function (resp) {
				console.log('Success on login', resp);
				$scope.methods.redirectToApp();
			})
			// Error
			.catch(function (resp) {
				console.warn('Error on login', resp);
				$scope.models.password = '';
				if (resp.status==401) {
					alert('Invalid credentials');
					return;
				}
				alert('Internal error..');
			})
		}

		// Init

	});

})(angular)