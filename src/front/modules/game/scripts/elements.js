var elements = {};

elements.sky = function () {
	return new THREE.Mesh(
		new THREE.SphereGeometry(1000, 60, 40),
		new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('resources/space.jpg', null, function () {
				scene.renderCamera();
			})
		})
	);
}

/*elements.ground = function () {
	return new THREE.Mesh(
		new THREE.CubeGeometry( GROUND_WIDTH, 6, GROUND_HEIGHT ),
		new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('resources/ground.jpg', null, function () {
				scene.renderCamera();
			})
		})
	);
}*/

elements.skateAlone = function () {
	return new THREE.Mesh(
		new THREE.CubeGeometry( 30, 2, 8 ),
		new THREE.MeshBasicMaterial({
			color: 0xEEEEEE
		})
	);
}

elements.skate = function (scene) {
	var self = {};
	var skate = elements.skateAlone();
	scene.addObject(skate);
	// Draw parts function
	self.move = function (positions) {
		skate.position.x = (positions.leftFoot[0]+positions.rightFoot[0])/2;
		skate.position.y = (positions.leftFoot[1]+positions.rightFoot[1])/2;
		skate.position.z = (positions.leftFoot[2]+positions.rightFoot[2])/2;
		skate.rotation.z = Math.atan(
			(positions.rightFoot[1]-positions.leftFoot[1])/
			(positions.rightFoot[0]-positions.leftFoot[0])
		);
	}

	return self;
}

elements.skeleton = function (scene) {
	var self = {};
	var parts = [
		'head', 'neck', 'leftShoulder', 'rightShoulder',
		'leftElbow', 'rightElbow','leftHand', 'rightHand',
		'torso', 'leftHip','rightHip', 'leftKnee', 'rightKnee',
		'leftFoot', 'rightFoot'
	];
	// Initializing parts
	self.parts = {};
	parts.forEach(function (part) {
		self.parts[part] = new THREE.Mesh(
			new THREE.SphereGeometry( 2.5, 30, 30 ),
			new THREE.MeshBasicMaterial({
				color: 0xFF0000
			})
		);
		scene.addObject(self.parts[part]);
	})
	// Draw parts function
	self.move = function (positions) {
		Object.keys(positions).forEach(function (position) {
			if (!self.parts[position]) return;
			self.parts[position].position.x = positions[position][0];
			self.parts[position].position.y = positions[position][1];
			self.parts[position].position.z = positions[position][2];
		})
	}

	return self;
}