module.exports = function ( $database ) {
	
	var Employee = $database.main.models.Employee;
	var Role = $database.main.models.Role;

	var createRootUser = function () {
		
		// Create base role
		console.log( 'Creating base role..' );
		Role.createBaseRole().then(function (role) {
			if (!role) {
				console.log( 'Base role already created..' );
				return;
			}
		
			// Create Employee
			console.log( 'Creating admin user..' );
			Employee.createBaseAdmin( role.id ).then(function (newAdmin) {
				if (!newAdmin) console.log( 'Admin already created..' );
				else console.log( 'New admin registered: ', newAdmin );
			});			
		});
		
	}

	// Create root user
		setTimeout( createRootUser , 5000);


}