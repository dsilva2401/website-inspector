module.exports = function ($) {
	var r = {};
	var game = new $.methods.Game();

	r.start = function (req, res, next) {
		game.start();
		res.json( game.getMetheoritesStatus() );
	}

	r.stop = function (req, res, next) {
		game.stop();
		res.json( game.getMetheoritesStatus() );
	}

	r.reset = function (req, res, next) {
		game.reset();
		res.json( game.getMetheoritesStatus() );
	}

	r.setSpeed = function (req, res, next) {
		game.setSpeed( req.body.speed );
		res.json( game.getMetheoritesStatus() );
	}

	r.setCapacity = function (req, res, next) {
		game.setCapacity( req.body.capacity );
		res.json( game.getMetheoritesStatus() );
	}

	r.getMetheoritesStatus = function (req, res, next) {
		res.json( game.getMetheoritesStatus() );
	}

	return r;
}