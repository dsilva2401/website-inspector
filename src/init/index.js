module.exports = function ( $methods ) {
	
	setTimeout(function () {

		$methods.Init.firstSetup();
		$methods.Init.verifyIfNewPlatforms();

	},4000);

}