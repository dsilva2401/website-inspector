(function (ang) {
	
	var app = ang.module('app', []);

	app.controller('appController', function ($scope, $http) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
		$scope.methods.loadAvailablePlatforms = function () {
			$http.get('/api/v1/me')
			// Success
			.then(function (resp) {
				$scope.models.availablePlatforms = resp.data.availablePlatforms;
			})
			// Error
			.catch(function (resp) {
				console.warn('Error loading available platforms', resp);
			});
		}

		// Init
		$scope.methods.loadAvailablePlatforms();

	});

})(angular)