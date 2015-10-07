(function(ang) {

	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {
		
		// Resources
		$resourcesProvider.init({
				resources: {

					Me: {
						route: '/api/me'
					},

					GeoZones: {
						route: '/api/geozone/:geozoneId'
					},

					Roles: {
						route: '/api/role/:roleId'
					},

					Logout: {
						route: '/auth/logout'
					}

				}
			})

		// Routes
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('geozones', {
					url: '/geozones',
					template: '<div ui-view></div>',
					controller: 'geozonesController'
				})				
				.state('geozones.crud', {
					url: '/crud',
					templateUrl: '/front/modules/admin/geozones/crud.html',
					controller: 'geozonesCrudController'
				})
				.state('geozones.graph', {
					url: '/graph',
					templateUrl: '/front/modules/admin/geozones/graph.html',
					controller: 'geozonesGraphController'
				})
				.state('roles', {
					url: '/roles',
					template: '<div ui-view></div>',
					controller: 'rolesController'
				})
				.state('roles.admin', {
					url: '/admin',
					templateUrl: '/front/modules/admin/roles/admin.html',
					controller: 'rolesAdminController'
				})


	});

})(angular)