module.exports = function ($) {
	var Log = {};
	
	Log.successResponse = function (req, res, next) {
		return function (data) {
			res.status(200);
			res.json(data);
		}
	}

	Log.serverError = function (req, res, next) {
		return function (error) {
			res.status(res.statusCode || 500);
			res.json(error);
		}
	}

	Log.clientError = function (req, res, next) {
		return function (error) {
			res.status(res.statusCode || 500);
			res.json(error);
		}
	}

	return Log;
}