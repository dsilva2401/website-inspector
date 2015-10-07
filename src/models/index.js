module.exports = function ($config, $methods, $global) {

	// Database configuration
		var dbConfig = $config.databases['main'][$config.env];

	// Sequelize types
		var DataTypes = $global.Sequelize;

	// Create database
		var db = new $global.Sequelize(
			dbConfig.database,
			dbConfig.username,
			dbConfig.password,
			dbConfig.options
		);

	// Models
		var ParentModel = db.define('ParentModel', {
			attr: DataTypes.STRING
		});

	// Relations
		PendingEmployee.belongsTo( Role );


	// Sync database
		db.sync();

	return db;
}