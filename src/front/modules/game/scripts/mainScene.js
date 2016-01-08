function setMainScene (scene, wsFunctions, doFunctions, isFirstPerson) {

	// Add main cam
		var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
		camera.position.y = 100;
		camera.position.z = -150;
		camera.lookAt(new THREE.Vector3(0,0,0));
		var panoCamId = scene.addCamera(camera);

	// Set sky
		var skyMesh = elements.sky();
		skyMesh.scale.x = -1;
		setInterval(function () {
			skyMesh.rotation.y = (skyMesh.rotation.y+0.001)%(Math.PI*2);
		},20);
		scene.addObject(skyMesh);

	// Set ground
		var skate = new elements.skate(scene);

	// Add head camera
		var headCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
		var headCameraId = scene.addCamera(headCamera);

	// Set skeleton
		var skeleton = new elements.skeleton(scene);

	// WebSocket
		wsFunctions.push(function (movePositions) {
			skeleton.move(movePositions);
			headCamera.position.x = movePositions.head[0];
			headCamera.position.y = movePositions.head[1];
			headCamera.position.z = movePositions.head[2];
			skate.move(movePositions);
		});

	// Bind camera with device orientation
		doFunctions.push(function (ev) {
			headCamera.rotation.x = (ev.gamma+90)*Math.PI/-180;
			headCamera.rotation.y = (ev.alpha+360)*Math.PI/180;
			headCamera.rotation.z = ev.beta*Math.PI/-180;
		});
		
	// Enable controls
		scene.enableControls();

	// Change to viewer camera
		scene.changeCamera( isFirstPerson ? headCameraId : panoCamId );

	// Animate scene
		// scene.animate();
		setInterval(function () {
			scene.renderCamera();
		},1);

}