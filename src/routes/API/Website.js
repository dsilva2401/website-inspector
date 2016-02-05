module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;

	r.getData = function (req, res, next) {
		if (!req.query.url) {
			res.status(404)
			res.end('Url not found');
		}
		$.global.shelljs.exec('phantomjs phantomdata/website-data.js "'+req.query.url+'" '+(req.query.w||1024)+' '+(req.query.h||728));
		setTimeout(function () {
			var data = JSON.parse( $.global.fs.readFileSync('phantomdata/logfile.json', 'utf-8') );
			res.json( data );
		},1500);
	}

	return r;
}