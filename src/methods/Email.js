var nodemailer = require('nodemailer');

module.exports = function ($) {
	var m = {};
	var config = $.config.email;
	
	// Create reusable transporter object using SMTP transport
	// Enable => https://www.google.com/settings/security/lesssecureapps
	var transporter = nodemailer.createTransport({
	    service: config.service,
	    auth: {
	        user: config.auth.email,
	        pass: config.auth.password
	    }
	});

	m.send = function (options) {
		var deferred = $.q.defer();
		transporter.sendMail({
			    from: options.from || config.name+' <'+config.auth.email+'>', // sender address
			    to: options.to, // list of receivers
			    subject: options.subject, // Subject line
			    text: options.text || '', // plaintext body
			    html: options.html || '' // html body
		}, function(error, info){
		    if (error) {
		        deferred.reject(err);
		        return;
		    }
		    deferred.resolve(info);
		});
		return deferred.promise;
	}

	return m;
}