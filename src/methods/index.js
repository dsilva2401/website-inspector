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
		$methods.Log = require('./Log')($);
		$methods.Response = require('./Response')($);
		$methods.Person = require('./Person')($);
		$methods.Auth = require('./Auth')($);
		$methods.PeopleGroup = require('./PeopleGroup')($);
		$methods.PlatformRole = require('./PlatformRole')($);
		$methods.Init = require('./Init')($);

}