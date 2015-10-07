module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var Role = $.database.main.models.Role;

	r.getAll = function (req, res, next) {
		var filter = req.query.f || '';
		filter = filter.split(';');
		var findPromise = Role.findAll({
			// where: ['level > 0 and name=\'ds\'']
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

	r.get = function (req, res, next) {
		var roleId = req.params.roleId || null;
		var findPromise = Role.findAll({
			where: { ParentRoleId: roleId }
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

	r.post = function (req, res, next) {
		var parentId = req.params.roleId || null;
		var roleData = req.body;
		var createPromise = Role.createWithLevel({
			name: roleData.name,
			ParentRoleId: parentId
		});
		// Success
		createPromise.then(
			Response.success( req, res, next )
		);
		// Error
		createPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.put = function (req, res, next) {
		var roleData = req.body;
		var roleId = req.params.roleId;
		var updatePromise = Role.updateDataById( roleId, roleData );
		// Success
		updatePromise.then(
			Response.success( req, res, next )
		);
		// Error
		updatePromise.catch(
			Response.error( req, res, next )
		);
	}

	r.delete = function (req, res, next) {
		var roleId = req.params.roleId;
		var destroyPromise = Role.destroy({
			where: { id: roleId }
		});
		// Success
		destroyPromise.then(
			Response.success( req, res, next )
		);
		// Error
		destroyPromise.catch(
			Response.error( req, res, next )
		);
	}
	
	
	return r;
}