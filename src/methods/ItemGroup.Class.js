module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var ItemGroup = function () { return $.database.main.models.ItemGroup; }

	m.updateDataById = function ( id, iData ) {
		var deferred = $.q.defer();
		var findPromise = ItemGroup().findById( id );
		// Success
		findPromise.then(function (itemgroup) {
			Object.keys(iData).forEach(function (k) {
				itemgroup[k] = iData[k];
			});
			var savePromise = itemgroup.save();
			// Success
			savePromise.then(function (itemgroup) {
				deferred.resolve(itemgroup);
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