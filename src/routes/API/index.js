module.exports = function ($) {
	var c = {};

	c.GenericController = require('./GenericController')($);
	c.Me = require('./Me')($);

	return c;
}