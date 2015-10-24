module.exports = function ($) {
	var GenModelManager = {};
	var models = $.database.main.models;

	GenModelManager.basicGetAll = function (params) {
		var deferred = $.q.defer();
		var model = $.database.main.models[params.modelName];
		model.findAll()
		// Success
		.then(function (results) {
			deferred.resolve(results);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	GenModelManager.basicGetById = function (params) {
		var deferred = $.q.defer();
		var model = $.database.main.models[params.modelName];
		model.findById(params.idToFind)
		// Success
		.then(function (result) {
			deferred.resolve(result);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	GenModelManager.basicPost = function (params) {
		var deferred = $.q.defer();
		var model = $.database.main.models[params.modelName];
		model.create(params.data)
		// Success
		.then(function (result) {
			deferred.resolve(result);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	GenModelManager.basicPut = function (params) {
		var deferred = $.q.defer();
		var model = $.database.main.models[params.modelName];
		model.findById(params.idToFind)
		// Success
		.then(function (result) {
			Object.keys(params.data).forEach(function (attr) {
				result[attr] = params.data[attr];
			})
			result.save()
			// Success
			.then(function (result) {
				deferred.resolve(result);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			});
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	GenModelManager.basicDelete = function (params) {
		var deferred = $.q.defer();
		var model = $.database.main.models[params.modelName];
		model.findById(params.idToFind)
		// Success
		.then(function (result) {
			result.destroy()
			// Success
			.then(function (result) {
				deferred.resolve(result);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			});
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	GenModelManager.hierarchGetAll = function (params) {
		var keyValueId = params.idToFind || null;
		var deferred = $.q.defer();
		var model = $.database.main.models[params.modelName];
		var options = {};
		options.where = {};
		options.where[params.parentKey] = keyValueId;
		console.log(options);
		model.findAll(options)
		// Success
		.then(function (results) {
			deferred.resolve(results);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	GenModelManager.hierarchPostWithLevel = function (params) {
		var deferred = $.q.defer();
		var parentId = params.idToFind;
		var typeItem = !parentId ? 'parent' : 'child';
		var model = $.database.main.models[params.modelName];
		switch (typeItem) {

			case 'parent':
				params.data.level = 0;
				model.create(params.data)
				// Success
				.then(function (instance) {
					deferred.resolve(instance);
				})
				// Error
				.catch(function (err) {
					deferred.reject(err);
				});
			break;

			case 'child':
				model.findById(params.idToFind)
				// Success
				.then(function (parentInstance) {
					params.data.level = parentInstance.dataValues.level+1;
					params.data[params.parentKey] = parentInstance.id;
					console.log('child2', params.data);
					model.create(params.data)
					// Success
					.then(function (instance) {
						deferred.resolve(instance);
					})
					// Error
					.catch(function (err) {
						deferred.reject(err);
					});
				})
				// Error
				.catch(function (err) {
					deferred.reject(err);
				});
			break;

		}
		return deferred.promise;
	}

	return GenModelManager;
}