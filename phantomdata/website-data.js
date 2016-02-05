var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
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

	// Get website data
	var websiteData = {};
	websiteData.url = url;
	websiteData.title = page.evaluate(function() { return document.title; });
	websiteData.scripts = (function () {
		
	})();

	// Update logfile
	// console.log(JSON.stringify);
	// console.log(fs.write);
	fs.write('logfile.json', JSON.stringify(websiteData))


	phantom.exit();
});
