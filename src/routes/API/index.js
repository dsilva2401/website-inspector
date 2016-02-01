module.exports = function ($) {
	var c = {};

	c.Logs = require('./Logs')($);

	return c;
}