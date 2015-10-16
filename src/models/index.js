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
		var Person = db.define('Person', {
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			sex: DataTypes.CHAR,
			birthday: DataTypes.DATE
		});

		var Credential = db.define('Credential', {
			email: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING
		});

		var SessionKey = db.define('SessionKey', {
			key: DataTypes.STRING
		});

	// Relations
		Credential.belongsTo( Person );
		SessionKey.belongsTo( Person );

	// Sync database
		db.sync();

	return db;
}