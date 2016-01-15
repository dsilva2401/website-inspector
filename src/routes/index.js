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
		viewsRouter.get('/game', Views.game );

	// API
		apiRouter.post('/game/start', API.Game.start);
		apiRouter.post('/game/stop', API.Game.stop);
		apiRouter.put('/game/speed', API.Game.setSpeed);
		apiRouter.put('/game/capacity', API.Game.setCapacity);
		apiRouter.get('/game/status', API.Game.getMetheoritesStatus);
		apiRouter.delete('/game/reset', API.Game.reset);

	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}