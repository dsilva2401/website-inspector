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
		models.ServerErrorLog.create({
			PersonId: (req.currentPerson || {}).id || null,
			method: req.method,
			url: req.originalUrl,
			duration: Date.now() - req.requestTimestamp,
			code: res.statusCode
		});
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