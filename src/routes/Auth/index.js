module.exports = function ($) {
	var r = {};
	var Auth = $.methods.Auth;
	var Person = $.methods.Person;
	var Response = $.methods.Response;

	r.getCurrentSession = function (req, res, next) {
		var uid = req.cookies.uid;
		var skey = req.cookies.skey;
		Auth.getCurrentSession(uid, skey)
		// Success
		.then(function (person) {
			req.currentPerson = person;
			next();
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}

	r.preventIfAlreadyLoggedIn = function (req, res, next) {
		if (req.currentPerson) {
			res.status(409);
			Response.error(req, res, next)({
				details: 'User already logged in'
			});
			return;
		}
		next();
	}

	r.redirectIfNotLoggedIn = function (route) {
		return function (req, res, next) {
			if (!req.currentPerson) {
				res.redirect(route);
				return;
			}
			next();		
		}
	}

	r.redirectIfAlreadyLoggedIn = function (route) {
		return function (req, res, next) {
			if (req.currentPerson) {
				res.redirect(route);
				return;
			}
			next();		
		}
	}

	r.preventIfNotLoggedIn = function (req, res, next) {
		if (!req.currentPerson) {
			res.status(401);
			Response.error(req, res, next)({
				details: 'User not logged in'
			});
			return;
		}
		next();
	}

	r.register = function (req, res, next) {
		Person.createWithCredentials({
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			sex: req.body.sex,
			birthday: req.body.birthday,
			username: req.body.username,
			password: req.body.password
		})
		// Success
		.then(function (person) {
			Auth.createSession(person.id, res)
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

	r.login = function (req, res, next) {
		Auth.verifyCredentials({
			usernameOrEmail: req.body.usernameOrEmail,
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

	r.logout = function (req, res, next) {
		Auth.deleteSession(req.cookies.uid, req.cookies.skey, res)
		// Success
		.then(
			Response.success(req, res, next)
		)
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}

	r.verifyPlatformAccess = function (req, res, next) {
		next();
	}

	return r;
}