module.exports = function ($) {
	var m = {};

	m.success = function (req, res, next, options) {
		options = options || {};
		var callback = options.callback || function () {}
		return function (data) {
			callback( data );
			res.json( data );
			if (next) next();
			else res.end();
		}
	}

	m.error = function (req, res, next, options) {
		options = options || {};
		var callback = options.callback || function () {}
		return function ( err ) {
			console.log( $.config );
			// Dev env block
			if ( $.config.env == 'dev' ) {
				res.json( err );
				console.error( err );
			}
			res.status( 500 );
			callback( err );
			// Resolve response
			if (next) next();
			else res.end();
		}
	}

	return m;
}