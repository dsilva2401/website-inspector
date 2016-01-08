module.exports = function ($) {
	var r = {};

	r.game = function (req, res) {
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/game/index.html')
		);
	}

	return r;
}