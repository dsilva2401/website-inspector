module.exports = function ($global) {
	
	// Dependencies
	var $ = {};
	$.global = $global;

	// Error
	$global.Error = require('./Error')($);

}