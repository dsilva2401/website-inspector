var Sequelize = require('sequelize');

module.exports = function ($config, $methods) {

	// Database configuration
		var dbConfig = $config.databases['main'][$config.env];

	// Create database
		var db = new Sequelize(
			dbConfig.database,
			dbConfig.username,
			dbConfig.password,
			dbConfig.options
		);

	// Setup models
		// Person basic information
		var Person = db.define('Person', {
			name: Sequelize.STRING,
			lastname: Sequelize.STRING,
			email: { type: Sequelize.STRING, unique: true },
			documentNumber: Sequelize.STRING,
			sex: Sequelize.CHAR,
			birthday: Sequelize.DATE,
			mobile: Sequelize.INTEGER
		},
			{
				classMethods: $methods.Person.Class,
				instanceMethods: $methods.Person.Instance
			}
		);

		// Access credentials
		var Credential = db.define('Credential', {
			username: { type: Sequelize.STRING, unique: true },
			password: Sequelize.STRING,
			publicKey: Sequelize.STRING,
			privateKey: Sequelize.STRING,
			active: Sequelize.BOOLEAN
		},
			{
				classMethods: $methods.Credential.Class
			}
		);

		// Access session
		var SessionKey = db.define('SessionKey', {
			key: Sequelize.STRING
		},
			{
				classMethods: $methods.SessionKey.Class
			}
		);

		// Countries, Cities, Districts
		var GeoZone = db.define('GeoZone', {
			name: Sequelize.STRING,
			level: Sequelize.INTEGER
		},
			{
				classMethods: $methods.GeoZone.Class
			}
		);

		// ONPE table member, president, etc
		var Role = db.define('Role', {
			name: Sequelize.STRING,
			description: Sequelize.STRING,
			featuresAccess: Sequelize.STRING,
			level: Sequelize.INTEGER
		},
			{
				classMethods: $methods.Role.Class
			}
		);

		// Employee data
		var Employee = db.define('Employee', {
			active: Sequelize.BOOLEAN,
			isAdmin: Sequelize.BOOLEAN,
			geozoneAccess: Sequelize.STRING,
			RegisteredBy: Sequelize.INTEGER
		},
			{
				classMethods: $methods.Employee.Class
			}
		);

		// ONPE tables
		var ONPETable = db.define('ONPETable', {});

		// Broadcasts from any employee
		var BroadcastMessage = db.define('BroadcastMessage', {
			content: Sequelize.TEXT
		});

		// Employee suggestions
		var Suggestion = db.define('Suggestion', {
			content: Sequelize.TEXT
		});

		// Results from personeros or crawler
		var ONPETableResults = db.define('ONPETableResults', {});

		// Multiple options
		var Item = db.define('Item', {
			name: Sequelize.STRING,
			description: Sequelize.STRING
		},
			{
				classMethods: $methods.Item.Class
			}
		);

		// Multiple options
		var ItemGroup = db.define('ItemGroup', {
			name: Sequelize.STRING,
			description: Sequelize.STRING
		},
			{
				classMethods: $methods.ItemGroup.Class
			}
		);

		// Multiple options
		var Voter = db.define('Voter', {});

		// App features
		var PendingEmployee = db.define('PendingEmployee', {
			name: Sequelize.STRING,
			lastname: Sequelize.STRING,
			email: Sequelize.STRING,
			RegisteredBy: Sequelize.INTEGER 
		});

		// Employee OPNE Table
		var EmployeeONPETable = db.define('EmployeeONPETable', {});

		PendingEmployee.belongsTo( Role );
		Credential.belongsTo( Person );
		SessionKey.belongsTo( Person );
		GeoZone.belongsTo( GeoZone, { as: 'ParentGeoZone' } );
		Person.belongsTo( GeoZone, { as: 'District' } );
		Person.belongsTo( Item, { as: 'DocumentType' } );
		Role.belongsTo( Role,  { as: 'ParentRole' } )
		Employee.belongsTo( Person );
		Person.hasOne( Employee );
		Employee.belongsTo( Role );
		ONPETable.belongsTo( GeoZone );
		BroadcastMessage.belongsTo( Employee );
		BroadcastMessage.belongsTo( Role );
		Suggestion.belongsTo( Employee );
		Suggestion.belongsTo( GeoZone );
		ONPETableResults.belongsTo( ONPETable );
		ONPETableResults.belongsTo( Item, { as: 'PoliticalParty' } );
		ONPETableResults.belongsTo( Item, { as: 'Source' } );
		Item.belongsTo( ItemGroup );
		Voter.belongsTo( Person );
		Voter.belongsTo( ONPETable );
		EmployeeONPETable.belongsTo( Employee );
		EmployeeONPETable.belongsTo( ONPETable );


	// Sync database
		db.sync();

	return db;
}