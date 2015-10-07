(function(ang) {

	var app = ang.module('app');	
	app.controller('rolesAdminController',['$scope', '$state', '$resources', function ($scope, $state, $resources) {
		$scope.models = $scope.models || {};
		$scope.methods = $scope.methods || {};

		$scope.methods.setRole = function (role) {
			// Set current role
			$scope.models.currentRole = role;
			
			// Append to current path
			if (role) {
				$scope.models.currentRolePath.push( role );
			}
			else {
				$scope.models.currentRolePath = [];
			}

			// Load sub-roles
			$resources.Roles.get({
				urlParams: { roleId: (role || {}).id || null }
			}).then(function (resp) {
				console.log('Sub-roles loaded', resp.data);
				$scope.models.subRoles = resp.data;
			}).catch(function (err) {
				console.log('Error loading sub-roles', err);
			});
		}
		$scope.methods.setPathRole = function (index, role) {
			$scope.models.currentRolePath = $scope.models.currentRolePath.slice(0, index);
			$scope.methods.setRole(role);
		}
		$scope.methods.createRole = function () {
			var message = $scope.models.currentRole ?
				'Nombre de Sub-Rol a crear para '+$scope.models.currentRole.name :
				'Nombre de Rol';
			var roleName = prompt(message, '');
			if (!roleName) return;
			$resources.Roles.post({
				urlParams: { roleId: ($scope.models.currentRole || {}).id || null },
				data: {
					name: roleName
				}
			}).then(function (resp) {
				console.log('Role created ', resp.data);
				$scope.methods.setRole(resp.data);
			}).catch(function (err) {
				console.log('Error creating role: ', err);
			});
		}
		$scope.methods.updateName = function () {
			var message = 'Cambiar de nombre a Rol';
			var roleName = prompt(message, $scope.models.currentRole.name);
			if (!roleName) return;
			$resources.Roles.put({
				urlParams: { roleId: $scope.models.currentRole.id },
				data: {
					name: roleName
				}
			}).then(function (resp) {
				console.log('Role update ', resp.data);
				$scope.models.currentRole.name = roleName;
			}).catch(function (err) {
				console.log('Error updating role: ', err);
			});
		}

		// Init
		$scope.methods.setRole();

	}]);

})(angular)