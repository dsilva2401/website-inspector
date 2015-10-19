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
		var Auth = require('./Auth')($);

	// Views
		viewsRouter.get('/login', Views.login );

	// Auth
		authRouter.all('/*', Auth.getCurrentSession );
		authRouter.post('/login', Auth.preventIfAlreadyLoggedIn, Auth.login );

	// API
		apiRouter.get('/asd', function(req, res) {
			res.end('123');
		})


	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}