module.exports = function ($) {
	var r = {};
	var Auth = $.methods.Auth;
	var Response = $.methods.Response;

	r.startRequest = function (req, res, next) {
		req.requestTimestamp = Date.now();
		next();
	}

	return r;
}