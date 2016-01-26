(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/filter");
		$stateProvider

			// Filter view
				.state('filter', {
					url: '/filter',
					template: 'Filter',
				})

			// Building view
				.state('building', {
					url: '/building',
					template: 'Building',
				})


	});


})(angular)