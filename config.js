module.exports = {
	env: 'dev',
	httpServer: {
		domain: 'http://localhost:3000',
		host: '0.0.0.0',
		port: 3000
	},
	httpsServer: {
		domain: 'https://localhost:5000',
		host: '0.0.0.0',
		port: 5000
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
	rootPeopleGroup: {
		name: 'Staff'
	},
	rootPlatformRole: {
		name: 'App admin',
		description: 'App root admin',
		PlatformId: 1,
		featuresAccess: '*'
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
