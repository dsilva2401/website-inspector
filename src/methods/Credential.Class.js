module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var Credential = function () { return $.database.main.models.Credential; }


	m.cipherAndRegister = function ( person, credentials ) {
		var deferred = $.q.defer();
		// TODO : Cipher password
		var createPromise = Credential().create({
			username: credentials.username,
			password: credentials.password
		});
		// Success
		createPromise.then(function (credential) {
			var setCredentialPromise = credential.setPerson( person );
			// Success
			setCredentialPromise.then(function () {
				deferred.resolve( person );
			})
			// Error
			setCredentialPromise.catch(function ( err ) {
				deferred.reject( err );
			});
		})
		// Error
		createPromise.catch(function ( err ) {
			deferred.reject( err );
		});
		return deferred.promise;
	}


	m.verifyCredentials = function (username, password) {
		var deferred = $.q.defer();
		// TODO : Cipher password
		var findPromise = Credential().findOne({
			where: {
				username: username,
				password: password
			}
		});
		// Success
		findPromise.then(function (credential) {
			if (!credential) {
				deferred.reject( new $Error().invalidCredentials() );
				return;
			}
			deferred.resolve({
				PersonId: credential.PersonId,
				username: credential.username
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