module.exports = function ( $express, $app, $database, $methods, $config ) {

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
		var Auth = require('./Auth')($);
		var Views = require('./Views')($);
		var Person = require('./Person')($);
		var GeoZone = require('./GeoZone')($);
		var Role = require('./Role')($);
		var ItemGroup = require('./ItemGroup')($);
		var Item = require('./Item')($);
		var Features = require('./Features')($);
		var Staff = require('./Staff')($);
		var Employee = require('./Employee')($);

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
		apiRouter.get('/person', Person.getAll);
		apiRouter.get('/person/:personId', Person.getOne);
		// apiRouter.post('/person', Person.post);
		apiRouter.put('/person/:personId', Person.put);
		// GeoZone
		apiRouter.get('/geozone', GeoZone.get);
		apiRouter.get('/geozone/:geozoneId', GeoZone.get);
		apiRouter.put('/geozone/:geozoneId', GeoZone.put);
		apiRouter.post('/geozone', GeoZone.post);
		apiRouter.post('/geozone/:geozoneId', GeoZone.post);
		apiRouter.delete('/geozone/:geozoneId', GeoZone.delete);
		// Role
		apiRouter.get('/roles/all', Role.getAll);
		apiRouter.get('/role', Role.get);
		apiRouter.get('/role/:roleId', Role.get);
		apiRouter.put('/role/:roleId', Role.put);
		apiRouter.post('/role', Role.post);
		apiRouter.post('/role/:roleId', Role.post);
		apiRouter.delete('/role/:roleId', Role.delete);
		// Item groups
		apiRouter.get('/item-group', ItemGroup.getAll);
		apiRouter.get('/item-group/:itemgroupId', ItemGroup.getOne);
		apiRouter.put('/item-group/:itemgroupId', ItemGroup.put);
		apiRouter.post('/item-group', ItemGroup.post);
		apiRouter.delete('/item-group/:itemgroupId', ItemGroup.delete);
		// Item
		apiRouter.get('/item-group/:itemgroupId/item', Item.getAll);
		apiRouter.get('/item/:itemId', Item.getOne);
		apiRouter.put('/item/:itemId', Item.put);
		apiRouter.post('/item-group/:itemgroupId/item', Item.post);
		apiRouter.delete('/item/:itemId', Item.delete);
		// Available Features
		apiRouter.get('/features', Features.getAll);
		// Staff
		apiRouter.get('/staff/pending', Staff.getAllPending);
		apiRouter.get('/staff/pending/:pendingId', Staff.getOnePending);
		apiRouter.post('/staff/register', Staff.postPending);
		apiRouter.post('/employee', Employee.post);
		// Middle post
		apiRouter.all('/*', Middle.postAPI);


	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth', authRouter );
		$app.use( '/api', apiRouter );

}