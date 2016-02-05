var nodemon = require('nodemon');

nodemon({
	script: 'app.js',
	ext: 'js'
});

nodemon.on('start', function () {
	console.log('Starting server..');
}).on('quit', function () {
	console.log('Server has quit');
}).on('restart', function (files) {
	console.log('Server restarted due to: ', files);
});