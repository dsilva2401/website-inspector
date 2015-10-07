(function (ang) {
	
	var app = ang.module('register', []);

	app.controller('registerController', function ($scope, $http, $window, $timeout) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.getUrlParams = function () {
				var p = {};
				var params = $window.location.search;
				params = params.substring( 1, params.length - (params[params.length-1]=='/') );
				params.split('&').forEach(function (_p) {
					p[ _p.split('=')[0] ] = _p.split('=')[1];
				});
				return p;
			}
			$scope.methods.loadUserData = function () {
				var pId = $scope.methods.getUrlParams().p;
				$http.get('/api/staff/pending/'+pId).then(function (resp) {
					$scope.models.pUserData = resp.data;
					$scope.models.name = resp.data.name;
					$scope.models.lastname = resp.data.lastname;
					$scope.models.email = resp.data.email;
					// console.log(resp.data);
				}).catch(function (err) {
					console.warn('Error loading user data', err);
				});
			}
			$scope.methods.register = function () {
				if ($scope.models.password != $scope.models.repassword) {
					alert('Las contrasenas no coinciden');
					$scope.models.password = '';
					$scope.models.repassword = '';
					return;
				}
				$scope.models.processingRegister = true;
				$http.post('/api/employee', {
					name: $scope.models.name,
					lastname: $scope.models.lastname,
					email: $scope.models.email,
					sex: $scope.models.sex,
					username: $scope.models.username,
					password: $scope.models.password,
					pId: $scope.models.pUserData.id
				}).then(function (resp) {
					if (resp.data.ewError) {
						alert('Error: '+resp.data.details.es);
						return;
					}
					$scope.models.processingRegister = false;
					$window.location = '/login/?r=/';
					// console.log(resp.data)
				}).catch(function (err) {
					console.warn('Error on register', err);
					$scope.models.processingRegister = false;
					alert('Error en el servidor..');
				})
			}
		
		// Init
			$scope.methods.loadUserData();

	});


})(angular)