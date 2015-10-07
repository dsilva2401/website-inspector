(function (ang) {
	
	var app = ang.module('login', []);

	app.controller('loginController', function ($scope, $http, $window, $timeout) {
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
		$scope.methods.redirect = function () {
			var redirectQ = $scope.methods.getUrlParams().r;
			redirectQ = redirectQ ? 'r='+redirectQ : '';
			redirectQ += (redirectQ && redirectQ[redirectQ.length-1] != '/') ? '/' : '';
			redirectQ = redirectQ ? redirectQ + ($window.location.hash || '') : '';
			$window.location = '/auth/redirect/?'+redirectQ;
		}
		$scope.methods.popup = function (msg, type) {
			if (type == 'error') {
				$scope.models.errorMsg = msg;
			}
		}
		$scope.methods.resetForm = function () {
			$scope.models.password = '';
		}
		$scope.methods.submit = function () {
			$http.post('/auth/login/', {
				username: $scope.models.username,
				password: $scope.models.password
			}).then(function (resp) {
				if (resp.data.ewError) {
					$scope.methods.popup( resp.data.details.es, 'error' );
					$scope.methods.resetForm();
					return;
				}
				$scope.methods.popup( 'Bienvenido '+resp.data.name, 'msg' );
				$timeout(function () {
					$scope.methods.redirect();
				},100);
			}).catch(function (error) {
				$scope.methods.popup('Error en el servidor', 'error');
				$scope.methods.resetForm();
				console.log(error);
			});
		}

	});


})(angular)