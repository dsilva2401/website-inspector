module.exports = function ($global, $config) {
	
	$global.cookieParser = require('cookie-parser');
	$global.bodyParser = require('body-parser');
	$global.methodOverride = require('method-override');
	$global.compress = require('compression');
	$global.logger = require('morgan');
	$global.nodemailer = require('nodemailer');
	$global.Sequelize = require('sequelize');
	$global.path = require('path');
	$global.fs = require('fs');

}