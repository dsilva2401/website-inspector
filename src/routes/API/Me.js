module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var Auth = $.methods.Auth;

	r.info = function (req, res, next) {
		Auth.getAvailablePlatforms(req.currentPerson)
		// Success
		.then(function (availablePlatforms) {
			var me = req.currentPerson.dataValues;
			me.availablePlatforms = availablePlatforms;
			Response.success(req, res, next)( me );
		})
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	return r;
}