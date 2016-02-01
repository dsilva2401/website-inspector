module.exports = function ($) {

	var Console = {};

	Console.log = function () {
		console.log(arguments);
	}

	Console.warn = function () {
		console.warn(arguments);
	}

	Console.error = function () {
		console.error(arguments);
	}

	return Console;
}