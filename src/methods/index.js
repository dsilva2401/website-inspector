module.exports = function ($methods, $database, $q, $config, $global) {
	
	// Dependencies
		var $ = {};
		$.database = $database;
		$.q = $q;
		$.config = $config;
		$.global = $global;
		$.methods = $methods;

	// Methods
		$methods.Useful = require('./Useful')($);
		$methods.Response = require('./Response')($);
}