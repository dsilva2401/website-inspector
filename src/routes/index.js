module.exports = function ( $express, $app, $methods, $config, $global, $database ) {

	// Controllers dependencies
		var $ = {};
		$.methods = $methods;
		$.config = $config;
		$.global = $global;
		$.database = $database;

	// Routes
		var viewsRouter = $express.Router();
		var authRouter = $express.Router();
		var apiRouter = $express.Router();

	// Controllers
		var Middleware = require('./Middleware')($);
		var Views = require('./Views')($);
		var Auth = require('./Auth')($);
		var API = require('./API')($);

	// Middleware
		authRouter.all('/*', Middleware.startRequest );
		apiRouter.all('/*', Middleware.startRequest );

	// Auth
		authRouter.post('/webmaster/login', Auth.Webmaster.login);
		authRouter.delete('/webmaster/logout', Auth.Webmaster.logout);

	// API
		apiRouter.get('/server-error/:errorId', API.Logs.getServerErrorDetails);
		apiRouter.get('/website/data', API.Website.getData);

	// Views
		viewsRouter.get('/wmaster', Auth.Webmaster.verifySession, Views.webmaster );
		viewsRouter.get('/', Views.app );

	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}