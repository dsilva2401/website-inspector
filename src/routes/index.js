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
		var Middleware = require('./Middleware')($);
		var Views = require('./Views')($);
		var Auth = require('./Auth')($);
		var API = require('./API')($);

	// Middleware
		viewsRouter.all('/*', Auth.getCurrentSession );
		authRouter.all('/*', Middleware.startRequest );
		authRouter.all('/*', Auth.getCurrentSession );
		apiRouter.all('/*', Middleware.startRequest );
		apiRouter.all('/*', Auth.getCurrentSession );

	// Views
		// Access and register
		viewsRouter.get('/login', Auth.redirectIfAlreadyLoggedIn('/'), Views.login );
		viewsRouter.get('/register', Auth.redirectIfAlreadyLoggedIn('/'), Views.register );
		// Platforms
		viewsRouter.get('/admin', Auth.redirectIfNotLoggedIn('/login') );
		viewsRouter.get('/admin', Auth.verifyPlatformAccess, Views.admin );
		viewsRouter.get('/platforms', Auth.redirectIfNotLoggedIn('/login') );
		viewsRouter.get('/platforms', Views.platforms );

	// Auth
		authRouter.post('/login', Auth.preventIfAlreadyLoggedIn, Auth.login );
		authRouter.post('/register', Auth.preventIfAlreadyLoggedIn, Auth.register );
		authRouter.delete('/logout', Auth.preventIfNotLoggedIn, Auth.logout );

	// API
		apiRouter.all('/*', Auth.preventIfNotLoggedIn );
		apiRouter.get('/me', API.Me.info );

	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}