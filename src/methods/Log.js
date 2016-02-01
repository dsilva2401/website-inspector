module.exports = function ($) {
	var Log = {};
	var db = $.methods.Database('main');
	
	Log.successResponse = function (req, res) {
		var saveBodyQueryParamsData = !!!req.originalUrl.match('auth');
		db.model('SuccessResponseLog').create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp,
			body: saveBodyQueryParamsData ? JSON.stringify( req.body ) : null,
			query: saveBodyQueryParamsData ? JSON.stringify( req.query ) : null,
			params: saveBodyQueryParamsData ? JSON.stringify( req.params ) : null
		});
	}

	Log.serverError = function (req, res, details) {
		var saveBodyQueryParamsData = !!!req.originalUrl.match('auth');
		var deferred = $.q.defer();
		db.model('ServerErrorLog').create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp,
			details: JSON.stringify(details),
			status: res.statusCode,
			body: saveBodyQueryParamsData ? JSON.stringify( req.body ) : null,
			query: saveBodyQueryParamsData ? JSON.stringify( req.query ) : null,
			params: saveBodyQueryParamsData ? JSON.stringify( req.params ) : null
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

	Log.clientError = function (req, res, details) {
		db.model('ClientErrorLog').create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp,
			status: res.statusCode,
			details: JSON.stringify(details)
		});
	}

	return Log;
}