module.exports = function ($) {
	var Init = {};
	var models = $.database.main.models;
	
	Init.setupRootModels = function () {
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

	return Init;
}