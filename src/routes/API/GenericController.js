module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;
	var GenModelManager = $.methods.GenericModelManager;

	r.basicGetAll = function (modelName) {
		return function (req, res, next) {
			GenModelManager.basicGetAll({
				modelName: modelName
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}
 
	r.basicGetOne = function (modelName, modelKey) {
		return function (req, res, next) {
			GenModelManager.basicGetById({
				modelName: modelName,
				idToFind: req.params[modelKey]
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}

	r.basicPost = function (modelName) {
		return function (req, res, next) {
			GenModelManager.basicPost({
				modelName: modelName,
				data: req.body
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}

	r.basicPut = function (modelName, modelKey) {
		return function (req, res, next) {
			GenModelManager.basicPut({
				modelName: modelName,
				idToFind: req.params[modelKey],
				data: req.body
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}

	r.basicDelete = function (modelName, modelKey) {
		return function (req, res, next) {
			GenModelManager.basicDelete({
				modelName: modelName,
				idToFind: req.params[modelKey]
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}

	r.hierarchGetAll = function (modelName, modelKey, parentKey) {
		return function (req, res, next) {
			GenModelManager.hierarchGetAll({
				modelName: modelName,
				idToFind: req.params[modelKey],
				parentKey: parentKey
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}

	r.hierarchPostWithLevel = function (modelName, modelKey, parentKey) {
		return function (req, res, next) {
			GenModelManager.hierarchPostWithLevel({
				modelName: modelName,
				idToFind: req.params[modelKey],
				parentKey: parentKey,
				data: req.body
			})
			// Success
			.then(
				Response.success( req, res, next )
			)
			// Error
			.catch(
				Response.error( req, res, next )
			)
		}
	}

	return r;
}