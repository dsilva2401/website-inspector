(function (ang) {
	
	var app = ang.module('app', []);

	app.controller('appController', function ($scope, $http) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
		$scope.methods.submit = function () {
			$http.post('/auth/v1/login', {
				username: $scope.models.username,
				password: $scope.models.password,
			})
			// Success
			.then(function (resp) {
				console.log('Success on login', resp);
			})
			// Error
			.catch(function (error) {
				console.warn('Error en login', error);
			})
		}

		// Init

	});

})(angular)