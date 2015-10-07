module.exports = function ($) {
	var r = {};
	var Employee = $.database.main.models.Employee;

	r.preAPI = function ( req, res, next ) {
		next();
	}

	r.postAPI = function ( req, res, next ) {
		res.end();
	}

	r.preAuth = function ( req, res, next ) {
		req.ewData = req.ewData || {};
		var findPromise = Employee.findOne({
			where: { PersonId: req.cookies.uid }
		});
		// Success
		findPromise.then(function (employee) {
			req.ewData.currentEmployee = employee;
			next();
		});
		// Error
		findPromise.catch(function (err) {
			console.log(err);
			res.end('Error getting current employee data..');
		});
	}

	return r;
}