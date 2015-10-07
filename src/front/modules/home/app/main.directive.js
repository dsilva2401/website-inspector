(function(ang) {
	var app = ang.module('app');

	app.directive('appContent', function () {
		return {
			restrict: 'EA',
			templateUrl: '/front/modules/home/app/main.html',
			controller: 'appController'
		}
	})

})(angular)