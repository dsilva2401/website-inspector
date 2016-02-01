module.exports = function ($) {
	var c = {};

	c.Webmaster = require('./Webmaster')($);

	return c;
}