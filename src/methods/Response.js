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
			res.status(res.statusCode || 500);
			res.json(error);
		}
	}

	return Response;
}