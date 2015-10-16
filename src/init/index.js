module.exports = function ( $methods, $config ) {
	
	setTimeout(function () {

		// Create root user
		$methods.Person.createRootUser();
		
	},2000);

}