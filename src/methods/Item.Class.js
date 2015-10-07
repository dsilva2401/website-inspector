module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var ItemGroup = function () { return $.database.main.models.ItemGroup; }
	var Item = function () { return $.database.main.models.Item; }


	m.createInsideItemGroup = function ( igroupId, itemData ) {
		var deferred = $.q.defer();
		var findPromise = ItemGroup().findById(igroupId);
		// Success
		findPromise.then(function (itemgroup) {
			if (!itemgroup) {
				deferred.reject( new $Error().invalidItemGroup() );
				return;
			}
			var createPromise = Item().create({
				name: itemData.name,
				description: itemData.description
			});
			// Success
			createPromise.then(function (item) {
				var assignPromise = item.setItemGroup(itemgroup);
				// Success
				assignPromise.then(function (item) {
					deferred.resolve(item);
				});
				// Error
				assignPromise.catch(function (err) {
					deferred.reject(err);
				});
			});
			// Error
			findPromise.catch(function (err) {
				deferred.reject(err);
			});
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}


	m.updateDataById = function ( id, iData ) {
		var deferred = $.q.defer();
		var findPromise = Item().findById( id );
		// Success
		findPromise.then(function (item) {
			Object.keys(iData).forEach(function (k) {
				item[k] = iData[k];
			});
			var savePromise = item.save();
			// Success
			savePromise.then(function (item) {
				deferred.resolve(item);
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