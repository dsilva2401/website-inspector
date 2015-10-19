module.exports = function ($) {
	var Person = {};
	var models = $.database.main.models;
	
	Person.createWithCredentials = function (userData) {
		var deferred = $.q.defer();
		// Create Person instance	
		models.Person.create({
			name: userData.name,
			lastname: userData.lastname,
			email: userData.email,
			sex: userData.sex,
			birthday: userData.birthday
		})
		// Success
		.then(function (person) {
			// Create Credential instance
			models.Credential.create({
				email: userData.email,
				username: userData.username,
				password: userData.password
			})
			// Success
			.then(function (credential) {
				// Bind credential to person
				credential.setPerson( person )
				// Success
				.then(function (credential) {
					deferred.resolve(person);
				})
				// Error
				.catch(function (error) {
					person.destroy();
					credential.destroy();
					deferred.reject(error);
				})
			})
			// Error
			.catch(function (error) {
				person.destroy();
				deferred.reject(error);
			});
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	}

	Person.createRootUser = function () {
		// Find if root user already exists
		models.Credential.findOne({
			where: { username: 'admin' }
		})
		// Success
		.then(function (credential) {
			if (credential) {
				console.log('Root user already created');
				return;
			}
			// Create person and credentials
			Person.createWithCredentials({
				name: $.config.rootUser.name,
				email: $.config.rootUser.email,
				username: $.config.rootUser.username,
				password: $.config.rootUser.password,
				birthday: $.config.rootUser.birthday,
				sex: $.config.rootUser.sex
			})
			// Success
			.then(function (rootUser) {
				console.log('Root user created!');
			})
			// Error
			.catch(function (error) {
				console.warn('Error creating root user ', error);
			});
		})
		// Error
		.catch(function (error) {
			console.warn('Error finding root user', error);
		})
	}

	return Person;
}