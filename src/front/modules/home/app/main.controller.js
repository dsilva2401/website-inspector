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
						state: 'training',
						name: 'Capacitacion',
						shown: true,
						actions: [
							{
								name: 'Ver contenido',
								state: 'training.watch'
							},
							{
								name: 'Administrar',
								state: 'training.admin'
							}
						]
					},
					{
						state: 'staff',
						name: 'Personal',
						shown: true,
						actions: [
							{
								name: 'Registrar',
								state: 'staff.register'
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