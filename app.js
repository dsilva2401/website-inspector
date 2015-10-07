
// Import modules
	var ExpressWrapper = require('express-wrapper');


// Create app
	var app = new ExpressWrapper();


// Setup app config
	app.config( require('./config') );


// App Settings
	app.init( require('./src/settings') );


// Setup global
	app.run( require('./src/global') );


// Setup methods
	app.run( require('./src/methods') );


// Setup database
	app.addDatabase('main', require('./src/models'));


// Setup routes
	app.run( require('./src/routes') );


// Init app
	app.run( require('./src/init') );


// Start server
	app.up();