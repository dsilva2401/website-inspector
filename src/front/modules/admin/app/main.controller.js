(function(ang) {

	var app = ang.module('app');

	app.controller('appController', function ($scope, $state, $resources, $window) {
		$scope.models = $scope.models || {};
		$scope.methods = $scope.methods || {};
		$scope.toggle  = true;
		// Methods
			$scope.methods.setAvailableModules = function () {
				$scope.models.availableModules = [
					{
						state: 'geozones',
						name: 'GeoZonas',
						shown: true,
						actions: [
							{
								name: 'Administrar',
								state: 'geozones.crud'
							},
							{
								name: 'Graficar',
								state: 'geozones.graph'
							}
						]
					},
					{
						state: 'roles',
						name: 'Roles',
						shown: true,
						actions: [
							{
								name: 'Administrar',
								state: 'roles.admin'
							}
						]
					}
				];
			}
			$scope.methods.goToModule = function (module, action) {
				$scope.models.currentModule = module.name;
				$state.go(action.state);
			}

			$scope.methods.colap = function (module) {				
				/*for (var i = 0; i < $scope.models.availableModules.length; i++) {
					$scope.models.availableModules[i].isCollapsed = !$scope.models.availableModules[i].isCollapsed;
				};*/
				module.shown = !module.shown;
			}
			$scope.methods.logout = function () {
				$resources.Logout.post().then(function (resp) {
					console.log('Success on logout: ', resp);
					$window.location = '/login';
				}).catch(function (err) {
					console.log('Error on logout: ', err);
				});
			}
			$scope.methods.loadCurrentUser = function () {
				$resources.Me.get().then(function (resp) {
					$scope.models.currentUser = resp.data;
				}).catch(function (err) {
					console.log('Error loading current user data', err);
				})
			}
		// Init
			$scope.methods.setAvailableModules();
			$scope.methods.loadCurrentUser();
	});

})(angular)