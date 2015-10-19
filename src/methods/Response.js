module.exports = function ($) {
	var Response = {};
	var Log = $.methods.Log;
	
	Response.success = function (req, res, next) {
		return function (data) {
			Log.successResponse(req, res);
			res.status(200);
			res.json(data);
		}
	}

	Response.error = function (req, res, next) {
		return function (error) {
			res.status(res.statusCode || 500);
			if (res.statusCode==500) Log.serverError(req, res);
			else Log.clientError(req, res);
			res.json(error);
		}
	}

	return Response;
}