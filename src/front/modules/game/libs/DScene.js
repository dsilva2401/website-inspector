var DScene = function (renderer) {

	// Attrs
		var self = this;
		self.scene = new THREE.Scene();
		self.cameras = [];
		self.lights = [];
		self.renderer = renderer;
		self.objects = [];
		self.controls = null;
		self.currentCamId = null;

	// Methods
		self.renderCamera = function () {
			self.renderer.render(self.scene, self.cameras[ self.currentCamId || 0]);
		}
		self.addCamera = function (cam) {
			var camId = self.cameras.length;
			self.cameras.push( cam );
			self.scene.add( cam );
			return camId;
		}
		self.changeCamera = function (camId) {
			if ( !self.cameras[camId] ) {
				console.warn('Camera '+camId+' not registered ');
				return;
			}
			self.currentCamId = camId;
		}
		self.addLight = function (light) {
			var lightId = self.lights.length;
			self.lights.push( light );
			self.scene.add( light );
			return lightId;
		}
		self.addObject = function (mesh) {
			var objectId = self.objects.length;
			self.scene.add( mesh );
			return objectId;
		}
		self.removeObject = function (mesh) {
			self.scene.remove( mesh );
		}
		self.enableControls = function () {
			if (!self.cameras.length) {
				console.warn('No camara defined');
				return;
			}
			var camera = self.cameras[self.currentCamId || 0];
			self.controls = new THREE.OrbitControls( camera, renderer.domElement );
		}
		self.animate = function () {
			requestAnimationFrame( self.animate );
			if (self.controls) self.controls.update();
			self.renderCamera();
		}
}