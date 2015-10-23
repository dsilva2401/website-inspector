module.exports = function ($) {
	var PlatformRole = {};
	var models = $.database.main.models;
	
	PlatformRole.createRootPlatformRole = function () {
		var deferred = $.q.defer();
		models.PlatformRole.create({
			name: $.config.rootPlatformRole.name,
			description: $.config.rootPlatformRole.description,
			PlatformId: $.config.rootPlatformRole.PlatformId,
			featuresAccess: $.config.rootPlatformRole.featuresAccess
		})
		// Success
		.then(function (platformRole) {
			deferred.resolve(platformRole);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return PlatformRole;
}