(function(ang) {

	var app = ang.module('app');

	app.filter('deleteLasteElem', function () {
		return function (a) {
			return a.slice(0, a.length-1);
		}
	});

	app.filter('sortGeozonesList', function () {
		return function (a) {
			a = a || [];
			return a.sort(function (x, y) {
				return x.name > y.name;
			});
		}
	});

	app.controller('geozonesCrudController', function ($scope, $state, $resources) {
		$scope.models = $scope.models || {};
		$scope.methods = $scope.methods || {};

		// Methods
		$scope.methods.setGeoZone = function (geozone) {
			// Set current geozone
			$scope.models.currentGeozone = geozone;
			
			// Append to current path
			if (geozone) {
				$scope.models.currentGeozonePath.push( geozone );
			}
			else {
				$scope.models.currentGeozonePath = [];
			}

			// Load sub-geozones
			$resources.GeoZones.get({
				urlParams: { geozoneId: (geozone || {}).id || null }
			}).then(function (resp) {
				console.log('Sub-geozones loaded', resp.data);
				$scope.models.subGeoZones = resp.data;
			}).catch(function (err) {
				console.log('Error loading sub-geozones', err);
			});
		}
		$scope.methods.setPathGeoZone = function (index, geozone) {
			$scope.models.currentGeozonePath = $scope.models.currentGeozonePath.slice(0, index);
			$scope.methods.setGeoZone(geozone);
		}
		$scope.methods.createGeoZone = function () {
			var message = $scope.models.currentGeozone ?
				'Nombre de Sub-Zona Geográfica a crear en la ubicación '+$scope.models.currentGeozone.name :
				'Nombre de Zona Geográfica';
			var geozoneName = prompt(message, '');
			if (!geozoneName) return;
			$resources.GeoZones.post({
				urlParams: { geozoneId: ($scope.models.currentGeozone || {}).id || null },
				data: {
					name: geozoneName
				}
			}).then(function (resp) {
				console.log('Geonzone created ', resp.data);
				$scope.methods.setGeoZone(resp.data);
			}).catch(function (err) {
				console.log('Error creating geozone: ', err);
			});
		}
		$scope.methods.updateName = function () {
			var message = 'Cambiar de nombre a Zona Geográfica';
			var geozoneName = prompt(message, $scope.models.currentGeozone.name);
			if (!geozoneName) return;
			$resources.GeoZones.put({
				urlParams: { geozoneId: $scope.models.currentGeozone.id },
				data: {
					name: geozoneName
				}
			}).then(function (resp) {
				console.log('Geonzone update ', resp.data);
				$scope.models.currentGeozone.name = geozoneName;
			}).catch(function (err) {
				console.log('Error updating geozone: ', err);
			});
		}

		// Init
		$scope.methods.setGeoZone();
			

	});

})(angular)