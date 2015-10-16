module.exports = function ( $express, $app, $methods, $config, $global ) {

	// Controllers dependencies
		var $ = {};
		$.methods = $methods;
		$.config = $config;
		$.global = $global;

	// Routes
		var viewsRouter = $express.Router();
		var authRouter = $express.Router();
		var apiRouter = $express.Router();

	// Controllers
		var Views = require('./Views')($);

	// Views
		viewsRouter.get('/login', Views.login);

	// Auth


	// API


	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth', authRouter );
		$app.use( '/api/v1', apiRouter );

}