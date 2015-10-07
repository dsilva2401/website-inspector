module.exports = function ($) {
	var r = {};
	var Person = $.database.main.models.Person;
	var SessionKey = $.database.main.models.SessionKey;
	var Response = $.methods.Response;

	r.meGet = function ( req, res, next ) {
		var personPromise = SessionKey.getCurrentUser(req);
		// Success
		personPromise.then(
			Response.success( req, res, next )
		);
		// Error
		personPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.mePut = function ( req, res, next ) {
		var personPromise = SessionKey.getCurrentUser(req);
		var newData = req.body;
		// Success 
		personPromise.then(function (person) {
			Object.keys(newData).forEach(function (attr) {
				person[attr] = newData[attr];
			});
			var savePromise = person.save();
			// Success
			savePromise.then(
				Response.success( req, res, next )
			);
			// Error
			savePromise.catch(
				Response.error( req, res, next )
			);
		});
		// Error
		personPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.getAll = function ( req, res, next ) {
		var personsPromise = Person.findByFilter( req.query );
		// Success
		personsPromise.then(
			Response.success( req, res, next )
		);
		// Error
		personsPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.getOne = function ( req, res, next ) {
		var personId = req.params.personId;
		var personPromise = Person.findById(personId);
		// Success
		personPromise.then(
			Response.success( req, res, next )
		);
		// Error
		personPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.post = function ( req, res, next ) {
		var personData = req.body;
		var registerMethod = ( 
			req.query.full ?
			Person.fullRegister :
			Person.basicRegister
		);
		var registerPromise = registerMethod(personData);
		// Success
		registerPromise.then(
			Response.success( req, res, next )
		);
		// Error
		registerPromise.catch(
			Response.error( req, res, next )
		);
	}

	r.put = function ( req, res, next ) {
		var persondata = req.body;
		var personId = req.params.personId;
		var updatePromise = Person.updateDataById( personId, persondata );
		// Success
		updatePromise.then(
			Response.success( req, res, next )
		);
		// Error
		updatePromise.catch(
			Response.error( req, res, next )
		);
	}

	return r;
}