(function (ang) {
	
	var app = ang.module('app');

	app.controller('systemLogsGeneralController', function ($scope, $http, $state) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.getTimeIntervalLabels = function (intval) {
				var values = [];
				switch (intval) {
					case 'month':
						for (var i = 0; i<31; i++) {
							values.push(i+1);
						}
					break;
					case 'week':
						values = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					break;
					case 'day':
						for (var i = 0; i<24; i++) {
							values.push(i);
						}
					break;
				}
				return values;
			}
			$scope.methods.setResponseTimeGraph = function (intval, data) {
				$scope.models.responseTime = {};
				$scope.models.responseTime.labels = ['Last', 'Current'];
				$scope.models.responseTime.markers = $scope.methods.getTimeIntervalLabels(intval);
				$scope.models.responseTime.data = data;
			}
		
		
		// Init
			$scope.methods.setResponseTimeGraph('week', [
				[65, 59, 80, 81, 56, 55, 40],
				[28, 48, 40, 19, 86, 27, 90]
			]);

	});

})(angular)