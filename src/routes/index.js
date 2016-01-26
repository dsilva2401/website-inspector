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

	// Views
		// viewsRouter.get('/game', Views.game );

	// API
		// apiRouter.post('/game/start', API.Game.start);

	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}