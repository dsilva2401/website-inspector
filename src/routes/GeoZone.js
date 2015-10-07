module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var GeoZone = $.database.main.models.GeoZone;


	r.get = function (req, res, next) {
		var geozoneId = req.params.geozoneId || null;
		var findPromise = GeoZone.findAll({
			where: { ParentGeoZoneId: geozoneId }
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
		var parentId = req.params.geozoneId || null;
		var geozoneData = req.body;
		var createPromise = GeoZone.createWithLevel({
			name: geozoneData.name,
			ParentGeoZoneId: parentId
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
		var geozoneData = req.body;
		var geozoneId = req.params.geozoneId;
		var updatePromise = GeoZone.updateDataById( geozoneId, geozoneData );
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
		var geozoneId = req.params.geozoneId;
		var destroyPromise = GeoZone.destroy({
			where: { id: geozoneId }
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