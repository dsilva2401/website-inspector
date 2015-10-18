module.exports = function ($) {
	var r = {};
	var Auth = $.methods.Auth;
	var Response = $.methods.Response;

	r.login = function (req, res, next) {
		Auth.verifyCredentials({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		})
		// Success
		.then(function (credentals) {
			if (!credentals) {
				res.status(401);
				Response.error(req, res, next)({
					details: 'Invalid credentals'
				});
				return;
			}
			Auth.createSession(credentals.dataValues.PersonId, res)
			// Success
			.then(
				Response.success(req, res, next)
			)
			// Error
			.catch(
				Response.error(req, res, next)
			)
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}

	return r;
}