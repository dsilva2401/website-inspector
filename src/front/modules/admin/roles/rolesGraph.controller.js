(function(ang) {

	var app = ang.module('app');	
	app.controller('geozonesGraphController',['$scope','VisDataSet','$resources',function ($scope, $state, $resources,VisDataSet) {
		console.log("Controlador Graficos");

		$scope.models = $scope.models || {};
		$scope.metodos = $scope.metodos || {};
		$scope.methods = $scope.methods || {};

		// Models
		$scope.models.nodes = [];
		$scope.models.edges = [];
		$scope.models.dat = $scope.models.dat || {};



/*
		// Metodos
		$scope.methods.addNodeEdge = function(geozone){
			for(var i=0;i<geozone.length ;i++){
				$scope.models.nodes.push({
					id: geozone[i].id,
					color: {
				      	border: '#2B7CE9',
				      	background: '#8173F9',
				      	highlight: {
					        border: '#2B7CE9',
					        background: '#D2E5FF'
				    	},
					    hover: {
					    	border: '#FF0FB4',
					        background: '#FF0FB4',
				    	}
				    },				    
					size : 10,
					shape : 'circle',
					label : geozone[i].name
				});

				//ADD EDGE IF EXIST				
				if(geozone[i].ParentGeoZoneId){
					$scope.models.edges.push(
				    	{from: geozone[i].ParentGeoZoneId, to: geozone[i].id}
			  		);
				}
			}
		}

	    $scope.methods.getGeoZones = function (geozone) {
	    	for(var i=0;i<10;i++){
			    $resources.Roles.get({
						urlParams: { geozoneId: i }
					}).then(function (resp) {
						return $scope.methods.addNodeEdge(resp.data);
					}).catch(function (err) {
						console.log('Error loading sub-geozones', err);
			});
			}
		}

		
		//Methods Graph Events
	

		$scope.metodos.click = function(properties){
			$scope.models.inf = (JSON.stringify(properties, null, 4));
			console.log(properties);
			console.log("HICISTE CLICK");
		}
		





		$scope.methods.iniGraph = function(){
			$scope.models.dat = {
				"nodes":$scope.models.nodes,
				"edges":$scope.models.edges
			};		
			$scope.options = {
			   	interaction :{
			   		hover :true
			   	},
		      	autoResize: true,
		      	layout: {
			    	randomSeed: undefined,
				    improvedLayout:true,
			    	hierarchical: {
			      		levelSeparation: 150,
			      		direction: 'LR',   // UD, DU, LR, RL
			    	}
			   	}
		    };
		}
*/

/* EN CASO DE EMERGENCIA DESCOMENTAR
		$scope.methods.aux = function(){
			var nodesExample = [
								{id:1,label:'EncargadoPais',shape:'circle', size:10},
								{id:2,label:'EncargadoDepa',shape:'circle', size:10},
								{id:3,label:'EncargadoProv',shape:'circle', size:10},
								{id:4,label:'EncargadoDistr',shape:'circle', size:10},
								{id:5,label:'EncargadoCV',shape:'circle', size:10},
								{id:6,label:'Personero',shape:'circle', size:10}
								];
			var edgesExample = [{from:1, to:2,shape:'circle', size:10},
								{from:2, to:3,shape:'circle', size:10},
								{from:3, to:4,shape:'circle', size:10},
								{from:4, to:5,shape:'circle', size:10},
								{from:5, to:6,shape:'circle', size:10}
							   ];
			$scope.models.datExample ={
				"nodes": nodesExample,
				"edges": edgesExample
			};

			$scope.optionsExample = {
		      	autoResize: true
		    };
		}
		$scope.methods.aux ();
*/
		// Init				


//		$scope.methods.getGeoZones();		
//		$scope.methods.iniGraph();

//		console.log("DATOS NODOS ARISTAS");
//		console.log($scope.models.dat);


	}]);

})(angular)