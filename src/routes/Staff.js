module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var Email = $.methods.Email;
	var PendingEmployee = $.database.main.models.PendingEmployee;

	r.getAllPending = function (req, res, next) {
		var filter = req.query.f || '';
		filter = filter.split(';');
		var findPromise = PendingEmployee.findAll({
			where: [ filter.join(' and ') ]
		});
		// Success
		findPromise.then(
			Response.success( req, res, next )
		);
		// Error
		findPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.getOnePending = function (req, res, next) {
		var pendingId = req.params.pendingId;
		var findPromise = PendingEmployee.findById(pendingId);
		// Success
		findPromise.then(
			Response.success( req, res, next )
		);
		// Error
		findPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.postPending = function (req, res, next) {
		var employeeData = req.body;
		var createPromise = PendingEmployee.create({
			name: employeeData.name,
			lastname: employeeData.lastname,
			email: employeeData.email,
			RegisteredBy: employeeData.registeredBy,
			RoleId: employeeData.roleId
		});
		// Success
		/*createPromise.then(
			Response.success( req, res, next )
		);*/
		createPromise.then(function (pEmployee) {
			var sendPromise = Email.send({
				to: employeeData.email,
				subject: 'Invitacion para ser parte del equipo PPK',
				html: 	'<h3>Hola '+employeeData.name+'</h3>'+
						'<p>Estas invitado a ser parte del equipo PPK!</p>'+
						'<span>Ingresa a este <a href="http://'+
						$.config.server.domain+'/register?p='+pEmployee.id+
						'">link</a> para completar tu informacion'
			})
			// Success
			sendPromise.then(function (info) {
				Response.success( req, res, next )( pEmployee );
			});
			// Error
			sendPromise.catch(function (err) {
				pEmployee.destroy();
				Response.error( req, res, next )(error)
			});
		});
		// Error
		createPromise.catch(
			Response.error( req, res, next )
		);
	}

	return r;
}