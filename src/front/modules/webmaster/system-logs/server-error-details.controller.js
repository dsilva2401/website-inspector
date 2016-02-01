(function (ang) {
	
	var app = ang.module('app');

	app.controller('systemLogsServerErrorDetailsController', function ($scope, $http, $state, $resources, $stateParams) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.findCode = function () {
				$state.go('systemLogs.serverErrorDetails', { errorId: $scope.models.code });
			}
			$scope.methods.loadServerError = function (code) {
				if (!code) return;
				$resources.ServerError.get({
					urlParams: { errorId: code }
				})
				// Success
				.then(function (resp) {
					$scope.models.currentServerError = resp.data;
					console.log(resp);
				})
				// Error
				.catch(function (resp) {
					console.warn( resp );
				})
			}
		
		// Init
			$scope.methods.loadServerError($stateParams.errorId);

	});

})(angular)