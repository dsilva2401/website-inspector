module.exports = {
	env: 'dev',
	httpServer: {
		domain: 'http://localhost:8080',
		host: '0.0.0.0',
		port: 8080
	},
	httpsServer: {
		domain: 'https://localhost:8081',
		host: '0.0.0.0',
		port: 8081
	},
	publicDir: 'public',
	frontDir: 'src/front',
	rootUser: {
		name: 'Admin',
		username: 'admin',
		password: 'password',
		email: 'admin@domain.com',
		sex: 'm',
		birthday: new Date(1993, 0, 24)
	},
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
