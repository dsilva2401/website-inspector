
// Import modules
	var ExpressWrapper = require('express-wrapper');


// Create app
	var app = new ExpressWrapper({
		httpsOptions: {	days: 3650, selfSigned: true }
	});


// Setup app config
	app.config( require('./config') );


// Setup global
	app.run( require('./src/global') );


// App settings
	app.init( require('./src/settings') );


// Setup models
	app.addDatabase('main', require('./src/models'));


// Setup methods
	app.run( require('./src/methods') );


// Setup routes
	app.run( require('./src/routes') );


// Init app
	app.run( require('./src/init') );


// Start server
	app.up();
