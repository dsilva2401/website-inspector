(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Website: {
						route: '/api/v1/website/data?:query'
					}

				}
			});	

		// Router
			/*$urlRouterProvider.otherwise('/search');
			$stateProvider
				.state('search', {
					url: '/search',
					template: 'search',
				})*/


	});


})(angular)