
// Import modules
	var https = require('https');
	var ExpressWrapper = require('express-wrapper');
	var express = require('express');
	var fs = require('fs');
	var pem = require('pem');


// Express app
	var app = express();


// Create HTTPS Server
	var server = https.Server({
		key: fs.readFileSync('keys/key.pem').toString(),
		cert: fs.readFileSync('keys/cert.pem').toString()
	}, app);


// Create app
	var app = new ExpressWrapper({
		server: server,
		app: app
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