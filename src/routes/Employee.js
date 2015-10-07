module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var Person = $.database.main.models.Person;
	var Employee = $.database.main.models.Employee;
	var PendingEmployee = $.database.main.models.PendingEmployee;

	r.post = function (req, res, next) {
		var employeeData = req.body;

		var findPromise = PendingEmployee.findById(employeeData.pId);
		// Success
		findPromise.then(function (pEmployee) {
			if (!pEmployee) {
				Response.error( req, res, next );
				return;	
			}
			// Creating user
			var createPromise = Person.fullRegister({
				name: employeeData.name,
				lastname: employeeData.lastname,
				email: employeeData.email,
				sex: employeeData.sex,
				username: employeeData.username,
				password: employeeData.password
			});
			// Success
			createPromise.then(function (person) {
				// Creating employee
				var employeePromise = Employee.create({
					active: true,
					isAdmin: false,
					// geozoneAccess: '*',
					RoleId: pEmployee.dataValues.RoleId,
					RegisteredBy: pEmployee.dataValues.RegisteredBy
				});
				// Success
				employeePromise.then(function (employee) {
					pEmployee.destroy();
					var setPersonPromise = employee.setPerson( person );
					// Success
					setPersonPromise.then(function (data) {
						Response.success( req, res, next )( person );
					});
					// Error
					setPersonPromise.catch(
						Response.error( req, res, next )
					);
				});
				// Error
				employeePromise.catch(
					Response.error( req, res, next )
				);
			});
			// Error
			createPromise.catch(
				Response.error( req, res, next )
			);
		});
		// Error
		findPromise.catch(
			Response.error( req, res, next )
		);
	}

	return r;
}