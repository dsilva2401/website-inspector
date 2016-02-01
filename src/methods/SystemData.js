module.exports = function ($) {

	var SystemData = {};
	var sdataPath = $.global.path.join($.config.rootDir, 'data', 'system-data.json');
	var sdata = JSON.parse( $.global.fs.readFileSync(sdataPath, 'utf-8') );

	SystemData.getWebmasters = function () {
		return sdata.webmasters;
	}

	return SystemData;
}