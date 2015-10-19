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
			lastname: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			sex: DataTypes.CHAR,
			birthday: DataTypes.DATE
		});

		var Credential = db.define('Credential', {
			email: { type: DataTypes.STRING, unique: true },
			username: { type: DataTypes.STRING, unique: true },
			password: DataTypes.STRING,
			active: DataTypes.BOOLEAN
		});

		var SessionKey = db.define('SessionKey', {
			key: DataTypes.STRING
		});

		var SuccessResponseLog = db.define('SuccessResponseLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER
		});

		var ClientErrorLog = db.define('ClientErrorLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			code: DataTypes.INTEGER
		});

		var ServerErrorLog = db.define('ServerErrorLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			code: DataTypes.INTEGER
		});

	// Relations
		Credential.belongsTo( Person );
		SessionKey.belongsTo( Person );

	// Sync database
		db.sync();

	return db;
}