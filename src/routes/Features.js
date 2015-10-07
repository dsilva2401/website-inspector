module.exports = function ($) {
	var r = {};
	var Response = $.methods.Response;


	r.getAll = function (req, res, next) {

		/*var availableFeatures = [
			{
				name: ''
			}
		];*/

		Response.success( req, res, next )( {} );
	}

	return r;
}