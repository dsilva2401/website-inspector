module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;

	r.getData = function (req, res, next) {
		console.log(req.query)
		res.end(':D');
	}

	return r;
}