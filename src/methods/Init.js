module.exports = function ($) {
	var Init = {};
	var models = $.database.main.models;
	
	Init.firstSetup = function () {
		$.methods.Person.createRootUser()
		// Success
		.then(function (rootUser) {
			console.log('Root user created');
			$.methods.PeopleGroup.createRootPeopleGroup(rootUser.id)
			// Success
			.then(function (peopleGroup) {
				console.log('Root PeopleGroup created');
				$.methods.PlatformRole.createRootPlatformRole()
				// Success
				.then(function (platformRole) {
					console.log('Root PlatformRole created');
					models.PersonPlatformRole.create({
						PersonId: rootUser.id,
						PlatformRoleId: platformRole.id
					})
					// Success
					.then(function (personPlatformRole) {
						console.log('All root models created');
					})
					// Error
					.catch(function (error) {
						console.log('Error creating root models', error);
						platformRole.destroy();
						peopleGroup.destroy();
						rootUser.destroy();
					});
				})
				// Error
				.catch(function (error) {
					console.warn('Error creating root PlatformRole', error);
					peopleGroup.destroy();
					rootUser.destroy();
				})
			})
			// Error
			.catch(function (error) {
				console.warn('Error creating root PeopleGroup', error);
				rootUser.destroy();
			})
		})
		// Error
		.catch(function (error) {
			console.warn('Error creating root user ', error);
		})
	}

	Init.verifyIfNewPlatforms = function () {
		var platformsPath = $.global.path.join( $.config.rootDir, 'data', 'platforms.json' );
		var platforms = JSON.parse( $.global.fs.readFileSync(platformsPath) );
		models.Person.findOne({
			email: $.config.rootUser.email
		})
		// Success
		.then(function (rootUser) {
			rootUser.getPlatformRoles()
			// Success
			.then(function (platformRoles) {
				if (!platformRoles || !platformRoles.length) {
					console.log('No platforms..');
					return;
				}
				platforms.forEach(function (platform) {
					if ( !platformRoles.filter(function (pr) { return pr.dataValues.PlatformId==platform.id; }).length ) {
						console.log(platform);
						console.log('Creating role for platform: ', platform.name);
						models.PlatformRole.create({
							name: $.config.rootPlatformRole.name,
							description: $.config.rootPlatformRole.description,
							PlatformId: platform.id,
							featuresAccess: $.config.rootPlatformRole.featuresAccess
						})
						// Success
						.then(function (platformRole) {
							models.PersonPlatformRole.create({
								PersonId: rootUser.id,
								PlatformRoleId: platformRole.id
							})
							// Success
							.then(function (personPlatformRole) {
								console.log('All root models created');
							})
							// Error
							.catch(function (error) {
								console.log('Error creating root models', error);
							});
						})
						// Error
						.catch(function (error) {
							console.warn(error);
						});
					}
				});
			})
			// Error
			.catch(function (error) {
				console.warn(error);
			})
		})
		// Error
		.catch(function (error) {
			console.warn(error);
		})
	}

	return Init;
}