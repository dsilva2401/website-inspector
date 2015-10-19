(function (ang) {
	
	var app = ang.module('app', []);

	app.controller('appController', function ($scope, $http) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
		$scope.methods.submit = function () {
			if ($scope.models.password != $scope.models.repassword) {
				alert('Password doesn\'t match');
				$scope.models.password = '';
				$scope.models.repassword = '';
				return;
			}
			$http.post('/auth/v1/register', {
				name: $scope.models.name,
				lastname: $scope.models.lastname,
				email: $scope.models.email,
				sex: $scope.models.sex,
				birthday: $scope.models.birthday,
				password: $scope.models.password
			})
			// Success
			.then(function (resp) {
				console.log('Success on register', resp);
			})
			// Error
			.catch(function (error) {
				console.warn('Error on register', error);
			})
		}

		// Init

	});

})(angular)