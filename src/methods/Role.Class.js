module.exports = function ($) {
	var m = {};
	var $Error = $.global.Error;
	var Role = function () { return $.database.main.models.Role; }

	m.createBaseRole = function () {
		var deferred = $.q.defer();
		var findPromise = Role().findOne({
			where: { level: 0 }
		});
		// Success
		findPromise.then(function (rRole) {
			// Already created
			if (rRole) {
				deferred.resolve(false);
				return;
			}
			// Creating new
			var createPromise = Role().create({
				name: 'Admin',
				level: 0
			});
			// Success
			createPromise.then(function (role) {
				deferred.resolve(role);
			});
			// Error
			createPromise.catch(function (err) {
				deferred.reject(err);
			});
		});
		// Error
		findPromise.catch(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	m.createWithLevel = function ( gData ) {
		var deferred = $.q.defer();
		var parentRoleId = gData.ParentRoleId;
		var typeRole = !parentRoleId ? 'parent' : 'child';
		switch (typeRole) {

			case 'parent':
				var createPromise = Role().create({
					name: gData.name,
					level: 1
				});
				// Success
				createPromise.then(function (role) {
					deferred.resolve(role);
				});
				// Error
				createPromise.catch(function (err) {
					deferred.reject(err);
				});
			break;

			case 'child':
				var findPromise = Role().findById(parentRoleId);
				// Success
				findPromise.then(function (parentRole) {
					var createPromise = Role().create({
						name: gData.name,
						ParentRoleId: parentRole.id,
						level: parentRole.dataValues.level+1
					});
					// Success
					createPromise.then(function (role) {
						deferred.resolve(role);
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
		var findPromise = Role().findById( id );
		// TODO : Implement verification
		// Success
		findPromise.then(function (role) {
			Object.keys(gData).forEach(function (k) {
				role[k] = gData[k];
			});
			var savePromise = role.save();
			// Success
			savePromise.then(function (role) {
				deferred.resolve(role);
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