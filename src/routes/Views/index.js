module.exports = function ($) {
	var r = {};

	r.login = function (req, res) {
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/login/index.html')
		);
	}

	return r;
}