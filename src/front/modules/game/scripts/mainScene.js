function setMainScene (scene, wsFunctions, doFunctions, isFirstPerson, gameFns) {

	// Add main cam
		var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
		camera.position.y = 50;
		camera.position.z = -200;
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
			// camera.position.y = movePositions.torso[]
			skate.move(movePositions);
		});

	// Bind camera with device orientation
		doFunctions.push(function (ev) {
			headCamera.rotation.x = (ev.gamma+90)*Math.PI/-180;
			headCamera.rotation.y = (ev.alpha+360)*Math.PI/180;
			headCamera.rotation.z = ev.beta*Math.PI/-180;
		});

	// Game metheorites
		var metheoritesMeshs = [];
		var goodMetheoriteI = elements.goodMetheorite();
		var badMetheoriteI = elements.badMetheorite();
		for (var i=0; i<15; i++) {
			metheoritesMeshs.push(
				elements.goodMetheorite()
			)
			scene.scene.add( metheoritesMeshs[i] );
		}
		gameFns.push(function (data) {
			data.metheorites.forEach(function (metheorite, index) {
				metheoritesMeshs[index].material = metheorite.isGood ? goodMetheoriteI.material : badMetheoriteI.material;
				metheoritesMeshs[index].geometry = metheorite.isGood ? goodMetheoriteI.geometry : badMetheoriteI.geometry;
				metheoritesMeshs[index].position.x = metheorite.position.x;
				metheoritesMeshs[index].position.y = metheorite.position.y - 20;
				metheoritesMeshs[index].position.z = 200 - index*40;
			});
			/*metheoritesMeshs.forEach(function (mesh) {
				scene.scene.remove( mesh );
			});
			data.metheorites.forEach(function (metheorite, index) {
				var methMesh = metheorite.isGood ? elements.goodMetheorite() : elements.badMetheorite();
				methMesh.position.x = metheorite.position.x;
				methMesh.position.y = metheorite.position.y;
				methMesh.position.z = 200 - index*10;
				metheoritesMeshs.push( methMesh );
				scene.scene.add( methMesh );
			});*/
		});

		setTimeout(function () {
			console.log( scene.scene );
		},17000);
		
	// Enable controls
		// scene.enableControls();

	// Change to viewer camera
		scene.changeCamera( isFirstPerson ? headCameraId : panoCamId );

	// Animate scene
		// scene.animate();
		setInterval(function () {
			scene.renderCamera();
		},1);

}