module.exports = function ($) {
	var PeopleGroup = {};
	var models = $.database.main.models;
	
	PeopleGroup.createRootPeopleGroup = function (createdById) {
		var deferred = $.q.defer();
		models.PeopleGroup.create({
			name: $.config.rootPeopleGroup.name,
			CreatedById: createdById
		})
		// Success
		.then(function (peopleGroup) {
			deferred.resolve(peopleGroup);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return PeopleGroup;
}