module.exports = function ($methods, $database, $q, $config, $global) {
	
	// Dependencies
		var $ = {};
		$.database = $database;
		$.q = $q;
		$.config = $config;
		$.global = $global;
		$.methods = $methods;

	// Methods
		$methods.SystemData = require('./SystemData')($);
		$methods.Useful = require('./Useful')($);
		$methods.Database = require('./Database')($);
		$methods.Log = require('./Log')($);
		$methods.Console = require('./Console')($);
		$methods.Response = require('./Response')($);
		$methods.Webmaster = require('./Webmaster')($);
}