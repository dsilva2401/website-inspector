module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var SessionKey = function () { return $.database.main.models.SessionKey; }
	var Person = function () { return $.database.main.models.Person; }
	var Employee = function () { return $.database.main.models.Employee; }
	var Role = function () { return $.database.main.models.Role; }
	

	m.generateKey = function (size) {
		var key = '';
		var abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		size = size || 25;
		for (var i=0; i<size; i++) {
			key += abc[ Math.floor(Math.random()*abc.length) ];
		}
		return key;
	}

	m.createSession = function (res, person) {
		var key = m.generateKey();
		var deferred = $.q.defer();
		var createPromise = SessionKey().create({
			key: key
		});
		// Success
		createPromise.then(function ( sessionKey ) {
			var setPersonPromise = sessionKey.setPerson(person);
			// Success
			setPersonPromise.then(function (sessionKey) {
				res.cookie('uid', sessionKey.PersonId);
				res.cookie('skey', sessionKey.key);
				deferred.resolve(person);
			});
			// Error
			setPersonPromise.catch(function (err) {
				deferred.reject(err);
			});
		});
		// Error
		createPromise.catch(function ( err ) {
			deferred.reject(err);
		});
		return deferred.promise;
	}


	m.getCurrentUser = function (req) {
		var deferred = $.q.defer();
		var personId = req.cookies.uid;
		var key = req.cookies.skey;
		var findPromise = SessionKey().findOne({
			where: {
				PersonId: personId,
				key: key
			}
		});
		// Success
		findPromise.then(function (sessionKey) {
			if (!sessionKey) {
				deferred.reject( new $Error().invalidSession() );
				return;
			}
			var personPromise = Person().findOne({
				where: {
					id: sessionKey.PersonId,
				},
				include: [{
					model: Employee(),
					include: [{
						model: Role()
					}]
				}]
			});
			// Success
			personPromise.then(function (person) {
				deferred.resolve( person );
			});
			// Error
			personPromise.catch(function (err) {
				deferred.reject(err);
			});
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	m.deleteCurrentSession = function (req) {
		var deferred = $.q.defer();
		var skey = req.cookies.skey;
		if (!skey) deferred.resolve({});
		var destroyPromise = SessionKey().destroy({
			where: { key: skey }
		});
		// Success
		destroyPromise.then(function () {
			deferred.resolve({});
		});
		// Error
		destroyPromise.catch(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	return m;
}