var elements = {};

elements.sky = function () {
	return new THREE.Mesh(
		new THREE.SphereGeometry(1000, 60, 40),
		new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('/front/modules/game/resources/space.jpg')
		})
	);
}

elements.goodMetheorite = function () {
	return new THREE.Mesh(
		new THREE.SphereGeometry( 5, 30, 30 ),
		new THREE.MeshBasicMaterial ({
			// color: 0xFFD700
			map: THREE.ImageUtils.loadTexture('/front/modules/game/resources/good.png')
		})
	);
}

elements.badMetheorite = function () {
	return new THREE.Mesh(
		new THREE.SphereGeometry( 8, 30, 30 ),
		new THREE.MeshBasicMaterial ({
			// color: 0xFF1534
			map: THREE.ImageUtils.loadTexture('/front/modules/game/resources/bad.png')
		})
	);
}

elements.skateAlone = function () {
	var sk = new THREE.Mesh(
		new THREE.CubeGeometry( 30, 2, 8 ),
		new THREE.MeshBasicMaterial({
			// color: 0xEEEEEE
			map: THREE.ImageUtils.loadTexture('/front/modules/game/resources/platform.jpg')
		})
	);
	var geometry = new THREE.CylinderGeometry( 2, 2, 10, 32 );
	var material = new THREE.MeshBasicMaterial({
		// color: 0xffff00
		map: THREE.ImageUtils.loadTexture('/front/modules/game/resources/platform.jpg')
	});
	var cylinder1 = new THREE.Mesh( geometry, material );
	var cylinder2 = new THREE.Mesh( geometry, material );
	sk.add( cylinder1 );
	sk.add( cylinder2 );
	cylinder1.rotation.x = Math.PI/2;
	cylinder1.position.x = -15;
	cylinder2.rotation.x = Math.PI/2;
	cylinder2.position.x = 15;
	return sk;
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
	self.parts = {};
	// Initializing parts
	parts.forEach(function (part) {
		self.parts[part] = new THREE.Mesh(
			new THREE.SphereGeometry( 2.5, 30, 30 ),
			new THREE.MeshBasicMaterial({
				color: 0xAAAAAA
			})
		);
		scene.addObject(self.parts[part]);
	})
	// Draw parts function
	self.move = function (positions) {
		Object.keys(positions).forEach( function(position) {
			if (!self.parts[position]) return;
			self.parts[position].position.x = positions[position][0];
			self.parts[position].position.y = positions[position][1];
			self.parts[position].position.z = positions[position][2];
		})
	}

	return self;
}