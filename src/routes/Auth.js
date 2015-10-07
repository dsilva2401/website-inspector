module.exports = function ($) {
	var r = {};
	var Credential = $.database.main.models.Credential;
	var Person = $.database.main.models.Person;
	var SessionKey = $.database.main.models.SessionKey;
	var Response = $.methods.Response;
	var Employee = $.database.main.models.Employee;

	r.login = function (req, res) {
		var username = req.body.username;
		var password = req.body.password;

		console.log( req.body )

		var findPromise = Credential.verifyCredentials(username, password);
		// Delete current session
		SessionKey.deleteCurrentSession(req);
		// Success
		findPromise.then(function (uData) {
			var personPromise = Person.findById(uData.PersonId);
			// Success
			personPromise.then(function (person) {
				var sessionPromise = SessionKey.createSession( res, person );
				// Success
				sessionPromise.then(
					Response.success( req, res )
				);
				// Error
				sessionPromise.catch(
					Response.error( req, res )
				);
			});
			// Error
			personPromise.catch(
				Response.error( req, res )
			);
		});
		// Error
		findPromise.catch(
			Response.error( req, res )
		);
	}

	r.logout = function (req, res) {
		var deletePromise = SessionKey.deleteCurrentSession(req);
		// Success
		deletePromise.then(
			Response.success( req, res )
		);
		// Error
		deletePromise.catch(
			Response.error( req, res )
		);
	}

	r.redirect = function (req, res) {
		var employee = req.ewData.currentEmployee.dataValues;
		var redirect = req.query.r || '';

		// Is't admin
		if (!employee.isAdmin) {
			redirect = ( redirect.indexOf('/admin')==0 ) ? '' : redirect;
			res.redirect( redirect || '/' );
			return;
		}

		// Is admin
		res.redirect( redirect || '/select-console' );
	}

	r.verifyAccess = function (req, res, next) {
		var findSessionPromise = SessionKey.findOne({
			where: { PersonId: req.cookies.uid, key: req.cookies.skey }
		});

		// Success
		findSessionPromise.then(function (session) {
			// Not logged in
			if (!session) {
				res.redirect('/login?r='+req.originalUrl);
				return;
			}

			// Employee access block
				var findPromise = Employee.findOne({
					where: { PersonId: req.cookies.uid }
				});
			
				// Success
				findPromise.then(function (employee) {
					// Isn't admin and try to go admin routes
					if (!employee.isAdmin && ( !req.url.indexOf('/admin') || !req.url.indexOf('/select-console') ) ) {
						res.redirect('/home');
						return;
					}
					// Everything is OK
					next();
				});

				// Error
				findPromise.catch(function (err) {
					console.log('Error: ', err);
					res.redirect('/login');
				});
			// ---

		});

		// Error
		findSessionPromise.catch(function (err) {
			console.log('Error: ', err);
			res.redirect('/login');
		})

		/*var findPromise = Employee.findOne({
			where: { PersonId: req.cookies.uid }
		});
		// Success
		findPromise.then(function (employee) {
			// Not logged in
			if (!employee) {
				res.redirect('/login?r='+req.originalUrl);
				return;
			}
			// Isn't admin and try to go admin routes
			if (!employee.isAdmin && ( !req.url.indexOf('/admin') || !req.url.indexOf('/select-console') ) ) {
				res.redirect('/home');
				return;
			}
			// Everything is OK
			next();
		});
		// Error
		findPromise.catch(function (err) {
			console.log('Error: ', err);
			res.redirect('/login');
		})*/
	}

	return r;
}