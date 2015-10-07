var path = require('path');

module.exports = function ($) {
	var r = {};
	var db = $.database.main;
	var models = db.models;

	r.login = function (req, res) {
		res.sendFile(
			path.join(__dirname,'../front/modules/login/index.html')
		);
	}

	r.register = function (req, res) {
		res.sendFile(
			path.join(__dirname,'../front/modules/register/index.html')
		);
	}

	r.redirectHome = function (req, res) {
		res.redirect('/home');
	}

	r.home = function (req, res) {
		res.sendFile(
			path.join(__dirname,'../front/modules/home/index.html')
		);
	}

	r.admin = function (req, res) {
		res.sendFile(
			path.join(__dirname,'../front/modules/admin/index.html')
		);
	}

	r.selectConsole = function (req, res) {
		res.sendFile(
			path.join(__dirname,'../front/modules/select-console/index.html')
		);
	}

	return r;
}