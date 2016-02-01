module.exports = function ($) {
	
	var mainDatabase = function () {
		var db = $.database.main;
		var mainDb = {};

		mainDb.model = function (modelName) {
			return db.models[modelName];
		}

		return mainDb;
	}


	return function (dbName) {
		switch (dbName) {
			case 'main':
				return mainDatabase();
			break;
		}
	}
}