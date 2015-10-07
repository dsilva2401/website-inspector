(function(ang) {

	var app = ang.module('app');

	app.controller('geozonesController', function ($scope, $state) {
		$scope.models = $scope.models || {};
		$scope.methods = $scope.methods || {};

		// Methods
			

		// Init
			$scope.models.currentModule = 'GeoZonas'
	});

})(angular)