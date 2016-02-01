module.exports = function ($) {
	var r = {};
	var Webmaster = $.methods.Webmaster;
	var Database = $.methods.Database;
	var Response = $.methods.Response;

	r.login = function (req, res, next) {
		var isAllowed = Webmaster.verifyCredentials(req.body.username, req.body.password)
		if (!isAllowed) {
			res.status(401);
			Response.error(req, res, next)({
				details: 'Invalid credentials'
			});
			return;
		}
		Webmaster.createSession(req.body.username, res)
		// Success
		.then(function (session) {
			Response.success(req, res, next)({
				details: 'Welcome webmaster'
			});
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}

	r.logout = function (req, res, next) {
		Webmaster.deleteSession()
		// Success
		.then(function () {
			Response.success(req, res, next)({
				details: 'Goodbye webmaster'
			})
		})
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	r.verifySession = function (req, res, next) {
		Webmaster.verifySession(req)
		// Success
		.then(function (session) {
			req.webmasterInSession = (!!session);
			next();
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}

	return r;
}