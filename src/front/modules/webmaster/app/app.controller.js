(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $state, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.setModules = function () {
				$scope.models.modules = [{
					name: 'System logs',
					submodules: [{
						name: 'Server error details',
						state: 'systemLogs.serverErrorDetails'
					}
					/*{
						name: 'General report',
						state: 'systemLogs.general'
					},{
						name: 'Server errors',
						state: 'systemLogs.serverErrors'
					},{
						name: 'Client errors',
						state: 'systemLogs.clientErrors'
					}*/]
				}]
			}
			$scope.methods.goToSubModule = function (state) {
				$state.go(state);
			}
			$scope.methods.logout = function () {
				$resources.Logout.delete().then(function (resp) {
					$window.location.reload();
				})
			}
		
		
		// Init
			$scope.methods.setModules();

	});

})(angular)