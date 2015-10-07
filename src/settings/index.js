var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var logger = require('morgan');


module.exports = function ($app, $config, $express, $global) {

	// Set parsers
	$app.use(bodyParser.json());
	$app.use(bodyParser.urlencoded({ extended: true }));
	$app.use(cookieParser());

	// Set logger
	$app.use(logger('dev'));

	// Compress all requests
	$app.use(compress());

	// Set static folder
	$app.use($express.static($config.publicDir));

	// Set front components status folder
	$app.use('/front', $express.static($config.frontDir));

	// Set Access Control
	$app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if ('OPTIONS' == req.method) res.send(200);
		else next();
	});

}
