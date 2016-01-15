module.exports = function ($) {
	var Response = {};
	
	Response.success = function (req, res, next) {
		return function (data) {
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
				res.json({
					details: 'Error in server',
					error: error
				})
			} else {
				res.json(error);
			}
		}
	}

	return Response;
}