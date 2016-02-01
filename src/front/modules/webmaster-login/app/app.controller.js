(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.submit = function () {
				$resources.Login.post({
					data: {
						username: $scope.models.username,
						password: $scope.models.password
					}
				})
				// Success
				.then(function (resp) {
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					console.warn(resp)
					if (resp.status == 401) $scope.models.invalidCredentials = true;
					if (resp.status >= 500) $scope.models.serverError = true;
					$scope.models.password = '';
				});
			}
		
		// Init

	});

})(angular)