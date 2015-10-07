module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var Person = function () { return $.database.main.models.Person; }
	var Credential = function () { return $.database.main.models.Credential; }


	m.fullRegister = function ( personData ) {
		var deferred = $.q.defer();
		var credentials = {
			username: personData.username,
			password: personData.password
		};

		// Params validation
		if (!credentials.username || !credentials.password) {
			var missing = [];
			if (!credentials.username) missing.push( 'username' );
			if (!credentials.password) missing.push( 'password' );
			deferred.reject( new $Error().missingParameters(missing) );
		}

		// Promise block
		var createPromise = Person().create({
			name: personData.name,
			lastname: personData.lastname,
			email: personData.email,
			sex: personData.sex
		});
		// Success
		createPromise.then(function ( person ) {
			var cipherPromise = Credential().cipherAndRegister( person, credentials );
			// Success
			cipherPromise.then(function () {
				deferred.resolve( person );
			})
			// Error
			cipherPromise.catch(function ( err ) {
				deferred.reject( err );
			});
		});
		// Error
		createPromise.catch(function ( err ) {
			// Email already registered validation
			if ( err.name == 'SequelizeUniqueConstraintError' ) {
				deferred.reject( new $Error(err).emailAlreadyRegistered() );
			} else {
				deferred.reject( err );
			}
		});

		return deferred.promise;
	}


	m.basicRegister = function ( personData ) {
		var deferred = $.q.defer();
		var createPromise = Person().create({
			name: personData.name,
			email: personData.email,
			sex: personData.sex
		});
		// Success
		createPromise.then(function ( personData ) {
			deferred.resolve(personData);
		});
		// Error
		createPromise.catch(function ( err ) {
			deferred.reject(err);
		});
		return deferred.promise;
	}


	m.findByFilter = function ( reqQuery ) {
		var deferred = $.q.defer();
		var findPromise = Person().findAll();
		// Success
		findPromise.then(function (persons) {
			deferred.resolve(persons);
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}


	m.updateDataById = function ( id, pData ) {
		var deferred = $.q.defer();
		delete pData.email;
		var findPromise = Person().findById( id );
		// Success
		findPromise.then(function (person) {
			Object.keys(pData).forEach(function (k) {
				person[k] = pData[k];
			});
			var savePromise = person.save();
			// Success
			savePromise.then(function (person) {
				deferred.resolve(person);
			});
			// Error
			savePromise.catch(function (err) {
				deferred.reject(err);
			});
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}


	return m;
}