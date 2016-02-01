module.exports = function ($) {
	var r = {};
	var Database = $.methods.Database;
	var Response = $.methods.Response;
	var db = $.methods.Database('main');

	r.getServerErrorDetails = function (req, res, next) {
		db.model('ServerErrorLog').findById(req.params.errorId)
		// Success
		.then(
			Response.success(req, res, next)
		)
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	return r;
}