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
			var eType;
			res.status(res.statusCode || 500);
			eType = Math.floor(parseInt(res.statusCode)/100);
			if (eType==5) {
				Log.serverError(req, res)
				// Success
				.then(function (errorLog) {
					res.json({
						details: 'Error in server',
						error: error,
						errorId: errorLog.id 
					})
				})
				// Error
				.catch(function (err) {
					res.json({
						details: 'Error logging server error',
						error: err 
					});
				});
			} else {
				Log.clientError(req, res);
				res.json(error);
			}
		}
	}

	return Response;
}