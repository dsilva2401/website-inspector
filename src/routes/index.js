module.exports = function ( $express, $app, $methods, $config ) {

	// Controllers dependencies
		var $ = {};
		$.database = $database;
		$.methods = $methods;
		$.config = $config;

	// Routes
		var viewsRouter = $express.Router();
		var authRouter = $express.Router();
		var apiRouter = $express.Router();

	// Controllers
		var Middle = require('./Middle')($);

	// Views
		viewsRouter.get('/', Views.redirectHome);
		viewsRouter.get('/home', Auth.verifyAccess, Views.home);
		viewsRouter.get('/admin', Auth.verifyAccess, Views.admin);
		viewsRouter.get('/login', Views.login);
		viewsRouter.get('/register', Views.register);
		viewsRouter.get('/select-console', Auth.verifyAccess, Views.selectConsole);

	// Auth
		authRouter.all('/*', Middle.preAuth);
		authRouter.post('/login', Auth.login);
		authRouter.post('/logout', Auth.logout);
		authRouter.get('/redirect', Auth.redirect);

	// API
		// Middle pre
		apiRouter.all('/*', Middle.preAPI);
		// Person
		apiRouter.get('/me', Person.meGet);
		apiRouter.put('/me', Person.mePut);

		// Middle post
		apiRouter.all('/*', Middle.postAPI);


	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth', authRouter );
		$app.use( '/api', apiRouter );

}