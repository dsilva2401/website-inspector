Guppy: A node js framework based on ExpressJS
-----------------------------------------------------

*Guppy is an open source NodeJS Framework based on ExpressJS, the goal is to structure code and promote good programming practices providing a seed and some rules.*


## Modules

![](docs/global-structure.png)

*Each arrow represents the connection of the modules, for example `Init` module just have access to `Methods` module.*


#### *Models*

Contains all persistent models, natively use [SequelizeJS](https://github.com/sequelize/sequelize), a promise-based Node.js/io.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

```js
	module.exports = function ($config, $methods, Sequelize) {

		// Database configuration
			var dbConfig = $config.databases['main'][$config.env];

		// Create database
			var db = new Sequelize(
				dbConfig.database,
				dbConfig.username,
				dbConfig.password,
				dbConfig.options
			);


			// Models

				var ParentModel = db.define('ParentModel', {
					attrX: Sequelize.INTEGER,
					attrY: Sequelize.INTEGER,
					attrZ: Sequelize.INTEGER
				});

				var SonModel = db.define('SonModel', {
					attrX: Sequelize.INTEGER,
					attrY: Sequelize.INTEGER,
					attrZ: Sequelize.INTEGER
				});

			// Relations

				SonModel.belongsTo( ParentModel );


		// Sync database
			db.sync();

		return db;
	}
```

## Links
- http://sequelize.readthedocs.org/en/latest/
- http://www.ijitee.org/attachments/File/v3i2/B1010073213.pdf
- https://en.wikipedia.org/wiki/Software_framework
- https://www.nsa.gov/ia/_files/support/guidelines_implementation_rest.pdf