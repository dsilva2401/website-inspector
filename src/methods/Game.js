module.exports = function ($) {
	var Game = null;
	var Useful = $.methods.Useful;

	Game = function () {

		// Attributes
			var self = this;
			var speed = 1000; //ms
			var nMemeteorites = 15;
			var metheorites = [];
			var movementInterval = null;
			var status = false;
			var mCounter = 0;

		// Methods
			var createMetheorite = function () {
				mCounter++;
				metheorites.unshift({
					isGood : Math.round( Math.random() ),
					position: {
						x: Math.round( Math.random()*-400+200 ),
						y: Math.round( Math.random()*200 )
					}
				});
			}
			var dropLastMetheorite = function () {
				metheorites.pop();
			}
			self.setSpeed = function (nSpeed) {
				speed = nSpeed;
			}
			self.start = function () {
				if (status) return;
				status = true;
				movementInterval = setInterval(function () {
					if (metheorites.length == nMemeteorites) {
						dropLastMetheorite();
					}
					createMetheorite();
				}, speed);
			}
			self.stop = function () {
				if (!status) return;
				status = false;
				mCounter = 0;
				clearInterval(movementInterval);
			}
			self.setCapacity = function (n) {
				nMemeteorites = n;
			}
			self.getMetheoritesStatus = function () {
				return {
					status: status,
					metheorites: metheorites,
					counter: mCounter,
					speed: speed,
					capacity: nMemeteorites
				};
			}
			self.reset = function () {
				self.stop();
				metheorites = [];
			}

	}

	return Game;
}