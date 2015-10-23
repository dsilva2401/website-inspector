module.exports = function ($) {
	var Auth = {};
	var Useful = $.methods.Useful;
	var models = $.database.main.models;

	Auth.verifyCredentials = function (credentials) {
		var deferred = $.q.defer();
		models.Credential.findOne({
			attributes: ['PersonId'],
			where: {
				$or: [ {username: credentials.usernameOrEmail}, {email: credentials.usernameOrEmail} ],
				$and: {password: credentials.password}
			}
		})
		// Success
		.then(function (credentials) {
			deferred.resolve(credentials);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}
	
	Auth.createSession = function (personId, res) {
		var deferred = $.q.defer();
		var sKey = Useful.createRandomWord(30);
		models.SessionKey.create({
			key: sKey,
			PersonId: personId
		})
		// Success
		.then(function (sessionKey) {
			res.cookie('uid', personId);
			res.cookie('skey', sKey);
			deferred.resolve({
				personId: personId
			});
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Auth.getCurrentSession = function (uid, skey) {
		var deferred = $.q.defer();
		models.SessionKey.findOne({
			PersonId: uid,
			key: skey
		})
		// Success
		.then(function (session) {
			if (!session) {
				deferred.resolve(null);
				return;
			}
			models.Person.findById(session.PersonId)
			// Success
			.then(function (person) {
				deferred.resolve(person);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Auth.deleteSession = function (uid, skey, res) {
		var deferred = $.q.defer();
		models.SessionKey.findOne({
			PersonId: uid,
			key: skey
		})
		// Success
		.then(function (session) {
			if (!session) {
				deferred.resolve(null);
				return;
			}
			session.destroy()
			// Success
			.then(function (status) {
				deferred.resolve(true);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Auth.getCurrentPlatformAndFeatures = function (person, platformUrl) {
		var deferred = $.q.defer();
		var platformsPath = $.global.path.join( $.config.rootDir, 'data', 'platforms.json' );
		var platforms = JSON.parse( $.global.fs.readFileSync(platformsPath) );
		var currentPlatform = platforms.filter(function (p) {
			return platformUrl.indexOf( p.path )>=0;
		})[0];
		person.getPlatformRoles()
		// Success
		.then(function (platformRoles) {
			var pRole = platformRoles.filter(function (r) { return r.dataValues.PlatformId==currentPlatform.id; })[0];
			if (pRole.dataValues.featuresAccess != '*') {
				pRole.dataValues.featuresAccess = JSON.parse(pRole.dataValues.featuresAccess);
				currentPlatform.features = currentPlatform.features.filter(function (f) {
					return pRole.dataValues.featuresAccess.indexOf( f.id )>=0;
				});
			}
			deferred.resolve( currentPlatform );
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return Auth;
}