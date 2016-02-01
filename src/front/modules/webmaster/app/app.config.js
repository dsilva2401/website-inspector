(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					ServerError: {
						route: '/api/v1/server-error/:errorId'
					},

					Logout: {
						route: '/auth/v1/webmaster/logout'
					}
				}
			});			

		// Router
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('systemLogs', {
					url: '/system-logs',
					template: '<div class="cover" ui-view></div>'
				})
					.state('systemLogs.general', {
						url: '/general',
						templateUrl: '/front/modules/webmaster/system-logs/general.html',
						controller:'systemLogsGeneralController'
					})
					.state('systemLogs.serverErrors', {
						url: '/server-errors',
						templateUrl: '/front/modules/webmaster/system-logs/server-errors.html'
					})
					.state('systemLogs.clientErrors', {
						url: '/client-errors',
						templateUrl: '/front/modules/webmaster/system-logs/client-errors.html'
					})
					.state('systemLogs.serverErrorDetails', {
						url: '/server-error-details/:errorId',
						templateUrl: '/front/modules/webmaster/system-logs/server-error-details.html',
						controller: 'systemLogsServerErrorDetailsController'
					})


	});


})(angular)