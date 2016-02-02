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

		var Person = db.define('Person', {
			name: DataTypes.STRING,
			lastname: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			sex: DataTypes.CHAR,
			birthday: DataTypes.DATE,
			active: { type: DataTypes.BOOLEAN, defaultValue: true }
		});

		var Credential = db.define('Credential', {
			email: { type: DataTypes.STRING, unique: true },
			username: { type: DataTypes.STRING, unique: true, allowNull: true },
			password: DataTypes.STRING
		});

		var SessionKey = db.define('SessionKey', {
			key: { type: DataTypes.STRING, unique: true, allowNull: false }
		});

		var WMSessionKey = db.define('WMSessionKey', {
			username: DataTypes.STRING,
			key: { type: DataTypes.STRING, unique: true, allowNull: false }
		});

		var SuccessResponseLog = db.define('SuccessResponseLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			body: DataTypes.TEXT,
			params: DataTypes.TEXT,
			query: DataTypes.TEXT
		});

		var ClientErrorLog = db.define('ClientErrorLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			status: DataTypes.STRING,
			details: DataTypes.TEXT,
			duration: DataTypes.INTEGER
		});

		var ServerErrorLog = db.define('ServerErrorLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			details: DataTypes.TEXT,
			query: DataTypes.TEXT,
			body: DataTypes.TEXT,
			params: DataTypes.TEXT,
			status: DataTypes.STRING
		});


	// Relations
		Credential.belongsTo( Person );
		SessionKey.belongsTo( Person );

	// Sync database
		db.sync();

	// Export database
		$database[name] = db;

}