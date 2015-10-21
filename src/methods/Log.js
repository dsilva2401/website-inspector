module.exports = function ($) {
	var Log = {};
	var models = $.database.main.models;
	
	Log.successResponse = function (req, res) {
		models.SuccessResponseLog.create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp
		});
	}

	Log.serverError = function (req, res) {
		var deferred = $.q.defer();
		models.ServerErrorLog.create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp,
			code: res.statusCode
		})
		// Success
		.then(function (errorLog) {
			deferred.resolve(errorLog);
		})
		// Error
		.catch(function (error) {
			deferred.resolve(error);
		});
		return deferred.promise;
	}

	Log.clientError = function (req, res) {
		models.ClientErrorLog.create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp,
			code: res.statusCode
		});
	}

	return Log;
}