(function (ang) {
	
	var app = ang.module('app');

	app.directive('appContainer', function () {
		return {
			restrict: 'EA',
			templateUrl: '/front/modules/app/app/app.html',
			controller: 'appController',
			link: function (scope, elem) {
				scope.methods = scope.methods || {};
				scope.models = scope.models || {};
				scope.models.containerWidth = elem[0].getElementsByClassName('screenshots-container')[0].offsetWidth;
				scope.models.containerHeight = elem[0].getElementsByClassName('screenshots-container')[0].offsetHeight;
				// console.log( elem[0].getElementsByClassName('screenshots-container')[0].offsetWidth )
			}
		}
	});

})(angular)