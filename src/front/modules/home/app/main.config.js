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

					RolesAll: {
						route: '/api/roles/all?:query'
					},

					StaffPending: {
						route: '/api/staff/pending/:staffId?:query'
					},

					StaffRegister: {
						route: '/api/staff/register'
					},

					Logout: {
						route: '/auth/logout'
					}

				}
			})

		// Routes
			$urlRouterProvider.otherwise("/");
			$stateProvider
				// Training module
				.state('training', {
					url: '/training',
					template: '<div ui-view></div>',
				})
					.state('training.watch', {
						url: '/watch',
						templateUrl: '/front/modules/home/training/watch.html'
					})
					.state('training.admin', {
						url: '/admin',
						template: '<p>Admin :P</p>',
					})
				// Staff
				.state('staff', {
					url: '/staff',
					template: '<div ui-view></div>',
				})
					.state('staff.register', {
						url: '/register',
						templateUrl: '/front/modules/home/staff/register.html',
						controller: 'staffRegisterController'
					})
				

	});

})(angular)