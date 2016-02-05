var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var url = system.args[1];
var w = system.args[2];
var h = system.args[3];
page.viewportSize = { width: w, height: h };

var startTimestamp = Date.now();
page.open(url, function(status) {
	console.log("Status: " + status);
	if (!(status === "success")) {
		console.log('Error on request');
		phantom.exit();
		return;
	}
	// Log success
	console.log('Success request');

	// Get website data
	var websiteData = {};
	websiteData.url = url;
	websiteData.title = page.evaluate(function() { return document.title; });
	websiteData.scripts = (function () {
		var scripts = [];
		var nScripts = page.evaluate(function() { return document.getElementsByTagName('script').length; });
		for (var i=0; i<nScripts; i++) {
			var s = eval('page.evaluate(function() { return document.getElementsByTagName(\'script\')['+i+'].src; });')
			if (s) scripts.push(s);
		}
		return scripts;
	})();
	websiteData.loadSpeed = Date.now()-startTimestamp;
	websiteData.previewSrc = 'phantomdata/preview.png';

	// Save screenshot
	page.render('phantomdata/preview.png');

	// Update logfile
	fs.write('phantomdata/logfile.json', JSON.stringify(websiteData))


	phantom.exit();
});
