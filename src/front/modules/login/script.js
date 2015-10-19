(function (ang) {
	
	var app = ang.module('app', []);

	app.controller('appController', function ($scope, $http) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
		$scope.methods.submit = function () {
			$http.post('/auth/v1/login', {
				usernameOrEmail: $scope.models.usernameOrEmail,
				password: $scope.models.password,
			})
			// Success
			.then(function (resp) {
				console.log('Success on login', resp);
			})
			// Error
			.catch(function (error) {
				console.warn('Error on login', error);
			})
		}

		// Init

	});

})(angular)