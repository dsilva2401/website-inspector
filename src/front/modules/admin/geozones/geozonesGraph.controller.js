(function(ang) {

	var app = ang.module('app');	
	app.controller('geozonesGraphController',['$scope','VisDataSet','$resources',function ($scope, $state, $resources,VisDataSet) {

		$scope.models = $scope.models || {};
		$scope.methods = $scope.methods || {};
		$scope.events = $scope.events || {};

		// Models
		$scope.models.nds  = [];
		$scope.models.edgs = [];
		$scope.models.dat  = {};


		// Metodos Grafos
		$scope.events.selectNode =function(nod){
			var ide = (nod.nodes[0])-1;
			var objAux = $scope.models.nds[ide];
		}


		// Scope Methods
		$scope.methods.addNodeEdge = function(objGeo){	
			console.log(objGeo);				
			var tam2 = Math.floor(30/(objGeo.level+1));
			var nvl  = objGeo.level + 1;
			$scope.models.nds.push({
				id 	  : objGeo.id,
				level : nvl,				
				size  : tam2,
				label : objGeo.name,
				title : objGeo.name
			});
			if(nvl == 1){
				$scope.models.edgs.push({
					from: objGeo.id, 
					to  : -1
				});
			}
			//Add edge if exists
			if(objGeo.ParentGeoZoneId){
				$scope.models.edgs.push(
			    	{from: objGeo.ParentGeoZoneId, to: objGeo.id}
				);
			}
		}

		$scope.methods.setGraph = function(){
			$scope.models.dat = {
 				"nodes":$scope.models.nds,
 				"edges":$scope.models.edgs
 			};		
 			$scope.models.options = {
 				edges: {
		            smooth: {
			                type:'cubicBezier',
			                forceDirection: 'vertical',
			                roundness: 0.4
			            }
		        },
		        nodes: {
		        	shape : 'dot',
			        borderWidth:4,
			        font: {
              		  	size: 12,
                		color: 'black'
                	},
      			},
 				physics:{
				    enabled: true,
				    barnesHut: {
				      	gravitationalConstant: -2000,
				      	centralGravity: 0.3,
				      	springLength: 95,
				      	springConstant: 0.04,
				      	damping: 0.09,
				      	avoidOverlap: 0
				    },
				    hierarchicalRepulsion: {
				    	centralGravity: 0.0,
				      	springLength: 100,
				      	springConstant: 0.01,
				      	nodeDistance: 120,
				      	damping: 0.09
				    },
				    maxVelocity: 50,
				    minVelocity: 0.1,
				    solver: 'barnesHut',
				    stabilization: {
				      enabled: false,				   				      
				      fit: true
				    },				    
				},
 		      	autoResize: true,
 		      	layout: {
 			    	randomSeed: undefined,
 				    improvedLayout:true,
 			    	hierarchical: {
 			      		levelSeparation: 120,
 			      		direction: 'UD'   // UD, DU, LR, RL
 			    	}
 			   	}
 			}; 			
 		}

	    $scope.methods.getGeoZone = function (id) {
			$resources.GeoZones.get({
				urlParams: { geozoneId: id}
			}).then(function(resp){
				for(var j=0;j<resp.data.length;j++)
					$scope.methods.addNodeEdge(resp.data[j]);
				$scope.methods.setGraph();
			});
		}

		$scope.methods.iniRoot = function(){
			$scope.models.nds.push({
				id : -1,
				level : 0,
				size : 10
			});
		}

		$scope.methods.init = function (){		
			$scope.methods.iniRoot();			
			for (var i = 0; i <100; i++) {
				$scope.methods.getGeoZone(i);			
			}
		}


		//Init
		$scope.methods.init();
		
	}]);
})(angular)
