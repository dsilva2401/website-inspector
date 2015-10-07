module.exports = {
	env: 'dev',
	server: {
		domain: 'localhost:3000',
		host: '0.0.0.0',
		port: 3000
	},
	publicDir: 'public',
	frontDir: 'src/front',
	databases: {
		main: {
			dev: {
				database: 'dbName',
				username: 'username',
				password: 'pwd',
				options: {
					host: 'localhost',
					dialect: 'sqlite',
					storage: 'data/database.sqlite'
				}
			}
		}
	}
}
