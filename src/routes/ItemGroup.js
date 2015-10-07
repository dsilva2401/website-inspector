module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var ItemGroup = $.database.main.models.ItemGroup;


	r.getAll = function (req, res, next) {
		var findPromise = ItemGroup.findAll();
		// Success
		findPromise.then(
			Response.success( req, res, next )
		);
		// Error
		findPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.getOne = function (req, res, next) {
		var findPromise = ItemGroup.findById(req.params.itemgroupId);
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
		var igroupData = req.body;
		var createPromise = ItemGroup.create({
			name: igroupData.name,
			description: igroupData.description
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
		var itemgroupData = req.body;
		var itemgroupId = req.params.itemgroupId;
		var updatePromise = ItemGroup.updateDataById( itemgroupId, itemgroupData );
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
		var itemgroupId = req.params.itemgroupId;
		var destroyPromise = ItemGroup.destroy({
			where: { id: itemgroupId }
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