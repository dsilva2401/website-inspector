module.exports = function ($config, $methods, $global, $database) {

	// Database name
		var name = 'main';

	// Database configuration
		var dbConfig = $config.databases[name][$config.env];

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
		/*var Person = db.define('Person', {
			documentType: DataTypes.CHAR,
			documentNumber: { type: DataTypes.STRING, unique: true },
			name: DataTypes.STRING,
			lastname: DataTypes.STRING,
			phone: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			sex: DataTypes.CHAR,
			birthday: DataTypes.DATE,
			ubigeo: DataTypes.STRING,
			gvot: DataTypes.STRING
		});

		var Credential = db.define('Credential', {
			email: { type: DataTypes.STRING, unique: true },
			username: { type: DataTypes.STRING, unique: true, allowNull: true },
			password: DataTypes.STRING,
			active: { type: DataTypes.BOOLEAN, defaultValue: true }
		});*/

		var WMSessionKey = db.define('WMSessionKey', {
			username: DataTypes.STRING,
			key: { type: DataTypes.STRING, unique: true, allowNull: false }
		});

	// Relations

	// Sync database
		db.sync();

	// Export database
		$database[name] = db;

}