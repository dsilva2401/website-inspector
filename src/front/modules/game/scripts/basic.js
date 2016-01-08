// Get current viewer cam
	var isFirstPerson = (function () {
		var p = {};
		var params = window.location.search;
		params = params.substring( 1, params.length - (params[params.length-1]=='/') );
		params.split('&').forEach(function (_p) {
			p[ _p.split('=')[0] ] = _p.split('=')[1];
		});
		return p;
	})().cam == 'fst';

// Init vars
	var container = document.getElementById('container');
	var containerLeft = document.getElementById('left');
	var containerRight = document.getElementById('right');

	WIDTH = container.offsetWidth-3;
	if (isFirstPerson) WIDTH /= 2;
	HEIGHT = container.offsetHeight-3;
	VIEW_ANGLE = 45;
	ASPECT = WIDTH / HEIGHT;
	NEAR = 0.1;
	FAR = 10000;
	GROUND_WIDTH = 800;
	GROUND_HEIGHT = 800;


// Renderer
	if (isFirstPerson) {
		var renderer1 = new THREE.WebGLRenderer();
		renderer1.setSize(WIDTH, HEIGHT);
		var renderer2 = new THREE.WebGLRenderer();
		renderer2.setSize(WIDTH, HEIGHT);
		containerLeft.appendChild(renderer1.domElement);
		containerRight.appendChild(renderer2.domElement);
	}
	else {
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(WIDTH, HEIGHT);	
		container.appendChild(renderer.domElement);
	}


// WebSocket
	var ws = new WebSocket('ws://192.168.43.71:8080/p5websocket');
	var wsFunctions = [];
	var keepWatchingFoot = true;
	var floorPosition = 0;
	setTimeout(function () { keepWatchingFoot=false; }, 5000);
	ws.onmessage = function(ev) {
		var data = JSON.parse(ev.data);
		var movePositions = {};
		Object.keys(data).forEach(function (part) {
			movePositions[part] = [ data[part][0]/-20, data[part][1]/20-floorPosition, data[part][2]/20 ]
		});
		wsFunctions.forEach(function (f) {
			f(movePositions);
		})		
		if (keepWatchingFoot) floorPosition = floorPosition ? (floorPosition+data.leftFoot[1]/20)/2 : data.leftFoot[1]/20;
	}


// Get device orientation
	var startBtn = document.getElementById('start-btn');
	var viewContainer = document.getElementById('views-container');
	var doFunctions = [];
	if (isFirstPerson) {
		var centerY = 0;
		var buffCenterY = 0;
		startBtn.onclick=function () {
			centerY = buffCenterY;
			document.body.removeChild(startBtn);
			if (viewContainer.requestFullscreen) {
				viewContainer.requestFullscreen();
			} else if (viewContainer.msRequestFullscreen) {
				viewContainer.msRequestFullscreen();
			} else if (viewContainer.mozRequestFullScreen) {
				viewContainer.mozRequestFullScreen();
			} else if (viewContainer.webkitRequestFullscreen) {
				viewContainer.webkitRequestFullscreen();
			}
		}
		window.addEventListener('deviceorientation', function(eventData) {
			buffCenterY = eventData.alpha;
			doFunctions.forEach(function (f) {
				f({
					gamma: eventData.gamma,
					beta: eventData.beta,
					alpha: eventData.alpha+centerY
				})
			});
		}, false);
	}
	else {
		document.body.removeChild(startBtn);
	}


// Main Scene
	if (isFirstPerson) {
		var mainScene1 = new DScene(renderer1);
		var mainScene2 = new DScene(renderer2);
		var s1 = new setMainScene( mainScene1, wsFunctions, doFunctions, isFirstPerson );
		var s2 = new setMainScene( mainScene2, wsFunctions, doFunctions, isFirstPerson );
	}
	else {
		var mainScene = new DScene(renderer);
		setMainScene( mainScene, wsFunctions, doFunctions, isFirstPerson );
	}
