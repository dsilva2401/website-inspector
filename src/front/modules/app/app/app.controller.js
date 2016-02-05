(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.setDims = function () {
				var wh = $scope.models.viewWidth/$scope.models.viewHeight;
				var cwh = $scope.models.containerWidth/$scope.models.containerHeight;
				if (wh >= cwh) {
					$scope.models.divWidth = $scope.models.containerWidth;
					$scope.models.divHeight = $scope.models.containerWidth/wh;
				} else {
					$scope.models.divHeight = $scope.models.containerHeight;
					$scope.models.divWidth = $scope.models.containerHeight*wh;
				}
			}
			$scope.methods.loadWebsiteData = function () {
				$scope.models.loading = true;
				$resources.Website.get({
					urlParams: { query: 'url='+$scope.models.url+'&w='+$scope.models.viewWidth+'&h='+$scope.models.viewHeight }
				})
				// Success
				.then(function (resp) {
					$scope.models.loading = false;
					console.log(resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading website data', resp);
				});
			}
		
		// Init
			$scope.$watch('models.viewHeight', function (v) {
				$scope.methods.setDims();
			})
			$scope.$watch('models.viewWidth', function (v) {
				$scope.methods.setDims();
			});
			$scope.models.viewWidth = 1024;
			$scope.models.viewHeight = 728;

	});

})(angular)