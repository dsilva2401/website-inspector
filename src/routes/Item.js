module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var Item = $.database.main.models.Item;


	r.getAll = function (req, res, next) {
		var itemgroupId = req.params.itemgroupId
		var findPromise = Item.findAll({
			where: { ItemGroupId: itemgroupId }
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

	r.getOne = function (req, res, next) {
		var findPromise = Item.findById(req.params.itemId);
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
		var itemData = req.body;
		var itemgroupId = req.params.itemgroupId;
		var createPromise = Item.createInsideItemGroup(itemgroupId, {
			name: itemData.name,
			description: itemData.description
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
		var itemData = req.body;
		var itemId = req.params.itemId;
		var updatePromise = Item.updateDataById( itemId, itemData );
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
		var itemId = req.params.itemId;
		var destroyPromise = Item.destroy({
			where: { id: itemId }
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