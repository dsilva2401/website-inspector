module.exports = function ($) {
	var SystemData = $.methods.SystemData;
	var Useful = $.methods.Useful;
	var db = $.methods.Database('main');
	var Webmaster = {};

	Webmaster.verifyCredentials = function (username, password) {
		var webmasters = SystemData.getWebmasters();
		return !!webmasters.filter(function (e) {
			return (e.username==username && e.password==password);
		}).length;
	}

	Webmaster.createSession = function (username, res) {
		var deferred = $.q.defer();
		db.model('WMSessionKey').create({
			username: username,
			key: Useful.createRandomWord(30)
		})
		// Success
		.then(function (session) {
			res.cookie('wmu', username);
			res.cookie('wmsk', session.dataValues.key);
			deferred.resolve(session);
		})
		// Errir
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Webmaster.deleteSession = function (username, res) {
		var deferred = $.q.defer();
		db.model('WMSessionKey').destroy({
			where: {}
		})
		// Success
		.then(function () {
			deferred.resolve(1);
		})
		// Errir
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}


	Webmaster.verifySession = function (req) {
		var deferred = $.q.defer();
		var username = req.cookies.wmu;
		var skey = req.cookies.wmsk;
		db.model('WMSessionKey').findOne({
			where: { key: skey }
		})
		// Success
		.then(function (session) {
			deferred.resolve(session);
		})
		// Error
		.then(function (error) {
			deferred.reject(error);	
		})
		return deferred.promise;
	}

	return Webmaster;
}