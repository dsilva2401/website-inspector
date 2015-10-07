module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var GeoZone = function () { return $.database.main.models.GeoZone; }

	m.createWithLevel = function ( gData ) {
		var deferred = $.q.defer();
		var parentGeoZoneId = gData.ParentGeoZoneId;
		var typeGeozone = !parentGeoZoneId ? 'parent' : 'child';
		switch (typeGeozone) {

			case 'parent':
				var createPromise = GeoZone().create({
					name: gData.name,
					level: 0
				});
				// Success
				createPromise.then(function (geozone) {
					deferred.resolve(geozone);
				});
				// Error
				createPromise.catch(function (err) {
					deferred.reject(err);
				});
			break;

			case 'child':
				var findPromise = GeoZone().findById(parentGeoZoneId);
				// Success
				findPromise.then(function (parentGeozone) {
					var createPromise = GeoZone().create({
						name: gData.name,
						ParentGeoZoneId: parentGeozone.id,
						level: parentGeozone.dataValues.level+1
					});
					// Success
					createPromise.then(function (geozone) {
						deferred.resolve(geozone);
					});
					// Error
					createPromise.catch(function (err) {
						deferred.reject(err);
					});
				});
				// error
				findPromise.catch(function (err) {
					deferred.reject(err);
				});
			break;

		}
		return deferred.promise;
	}

	m.updateDataById = function ( id, gData ) {
		var deferred = $.q.defer();
		var findPromise = GeoZone().findById( id );
		// TODO : Implement verification
		// Success
		findPromise.then(function (geozone) {
			Object.keys(gData).forEach(function (k) {
				geozone[k] = gData[k];
			});
			var savePromise = geozone.save();
			// Success
			savePromise.then(function (geozone) {
				deferred.resolve(geozone);
			});
			// Error
			savePromise.catch(function (err) {
				deferred.reject(err);
			});
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}


	return m;
}