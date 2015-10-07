(function(ang) {

	var app = ang.module('app');

	app.controller('staffRegisterController', function ($scope, $state, $resources, $window) {
		$scope.models = $scope.models || {};
		$scope.methods = $scope.methods || {};

		// Methods
			$scope.methods.loadRoles = function () {
				$resources.RolesAll.get({
					urlParams: { query: 'f=level>'+$scope.models.currentUser.Employee.Role.level }
				}).then(function (resp) {
					console.log('Roles loaded: ', resp.data);
					$scope.models.availableRoles = resp.data;
				}).catch(function (err) {
					console.warn('Error loading roles: ', err);
				})
			}
			$scope.methods.resetForm = function () {
				$scope.models.name = '';
				$scope.models.lastname = '';
				$scope.models.email = '';
				$scope.models.selectedRole = '';
				$scope.models.processingRegister = false;
			}
			$scope.methods.registerStaff = function () {
				$scope.models.processingRegister = true;
				$resources.StaffRegister.post({
					data: {
						registeredBy: $scope.models.currentUser.id,
						name: $scope.models.name,
						lastname: $scope.models.lastname,
						email: $scope.models.email,
						roleId: $scope.models.selectedRole
					}
				}).then(function (resp) {
					console.log('Staff registered', resp.data);
					alert('Registro exitoso!');
					$scope.methods.resetForm();
					$scope.methods.loadPendingStaff();
				}).catch(function (err) {
					console.warn('Error registering staff', err);
					alert('Error en el registro..');
					$scope.methods.resetForm();
				})
			}
			$scope.methods.loadPendingStaff = function () {
				$resources.StaffPending.get({
					urlParams: {
						query: 'f=RegisteredBy='+$scope.models.currentUser.id
					}
				}).then(function (resp) {
					console.log('Pending staff loaded', resp.data);
					$scope.models.pendingStaff = resp.data;
				}).catch(function (err) {
					console.warn('Error loading pending staff', err);
				})
			}
			
		// Init
			$scope.$watch('models.currentUser', function (user) {
				if (!user) return;
				$scope.methods.loadRoles();
				$scope.methods.loadPendingStaff();
			});
			$scope.models.processingRegister = false;
			
	});

})(angular)