var page = require('webpage').create();
var system = require('system')
var url = system.args[1];
var w = system.args[2];
var h = system.args[3];
page.viewportSize = { width: w, height: h };

page.open(url, function(status) {
	console.log("Status: " + status);
	if (!(status === "success")) {
		console.log('Error on request');
		phantom.exit();
		return;
	}

	var websiteData = ''

	phantom.exit();
});
