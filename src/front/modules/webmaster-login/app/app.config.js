(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Login: {
						route: '/auth/v1/webmaster/login'
					}
				}
			});

		// Router
			// $urlRouterProvider.otherwise("/");
			$stateProvider
				.state('stateX', {
					url: '/state-x',
					template: 'State X',
				})


	});


})(angular)