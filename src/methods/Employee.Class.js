module.exports = function ($) {
	var m = {};
	var Person = function () { return $.database.main.models.Person; }
	var Employee = function () { return $.database.main.models.Employee; }
	var Credential = function () { return $.database.main.models.Credential; }

	m.createBaseAdmin = function (roleId) {
		var deferred = $.q.defer();
		var adminData = {
			username: 'admin',
			password: 'password',
			name: 'Administrator',
			email: 'admin@example.com',
			sex: 'm'
		}

		// Find existing admin
		var findPromise = Credential().findOne({
			where: { username: adminData.username }
		});
		// Success
		findPromise.then(function (c) {
			if (c) {
				// console.log( 'Admin already registered' );
				deferred.resolve(false);
				return;
			}
			// Create employee instance
			var createPromise = Employee().create({
				active: true,
				isAdmin: true,
				geozoneAccess: '*',
				featuresAccess: '*',
				RoleId: roleId
			});
			// Success
			createPromise.then(function (employeeInstance) {
				var registerPromise = Person().fullRegister(adminData);
				// Success
				registerPromise.then(function (adminPerson) {
					var setPersonPromise = employeeInstance.setPerson( adminPerson );
					// Success
					setPersonPromise.then(function (data) {
						deferred.resolve({
							u: adminData.username,
							p: adminData.password
						});
					});
					// Error
					setPersonPromise.catch(function (err) {
						deferred.reject( err );
					});
				});
				// Error
				registerPromise.catch(function (err) {
					deferred.reject( err );
				});
			});
			// Error
			createPromise.catch(function (err) {
				deferred.reject( err );
			});
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject( err );
		});	
		return deferred.promise;
	}


	return m;
}



// var registerPromise = Person().fullRegister(adminData);
/*Person().fullRegister({
	name: 'Base Administrator',
	email: 'admin@example.com',
	sex: 'm',
	username: 'admin',
	password: 'password'
});*/