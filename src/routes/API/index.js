module.exports = function ($) {
	var c = {};

	c.Logs = require('./Logs')($);
	c.Website = require('./Website')($);

	return c;
}