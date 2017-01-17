//TODO: remove angular dependency
"use strict";
angular.module("App", []).controller("attributes", function($scope) {
	$scope.properties = {
		colour: "#ff0000",
		rotation: { x: 0, y: 0, z: 0 },
		translate: { x: 0, y: 0, z: 0 },
		scale: { x: 1, y: 1, z: 1 },
		shape_type: "0",
		shape_select: [],
		_colours: { r: 255, g: 0, z: 0 },
		light: { ambiant: 0.2, diffuse: 0.6, specular: 0.6, shininess: 5 },
		lighting: { first: 1, second: 1 },
		_matrix: flatten(mat4()),
		_normal_matrix: flatten(mat4())
	};
	$scope.clear_all = function() {
		$shapes = [];
		$scope.properties = {
			colour: "#ff0000",
			rotation: { x: 0, y: 0, z: 0 },
			translate: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
			shape_type: "0",
			shape_select: 0,
			_colours: { r: 255, g: 0, z: 0 },
			light: { ambiant: 0.2, diffuse: 0.6, specular: 0.6, shininess: 5 },
			lighting: { first: 1, second: 1 },
			_matrix: flatten(mat4()),
			_normal_matrix: flatten(mat4())
		};
	};
	$scope.add_shape = function() {
		$shapes.push(angular.copy($scope.properties));
		$scope.shapes = $shapes;
	};
	$scope.change_shape = function(value) {
		$scope.properties = $shapes[+value];
	};
	$scope.rgberise_colours = function() {
		var col = $scope.properties.colour;
		$scope.properties._colours = {
			r: (hexat(col,1) << 4) + hexat(col,2),
			g: (hexat(col,3) << 4) + hexat(col,4),
			b: (hexat(col,5) << 4) + hexat(col,6)
		};
	}
	$scope.update_matrix = function() {
		create_matrix($scope.properties);
	};
});
function hexat(str,pos) {
	// capital -> to lower, number -> does nothing
	var num = str.charCodeAt(pos) | 0x20;
	// 0x3x -> number x, 0x6x -> xth letter of alphabet (lower)
	return (((0x30+num)&0x90) >> 4) + (0xF&num);
}
function create_matrix(properties) {
	var scale = mat4(
		+properties.scale.x, 0.0, 0.0, 0.0,
		0.0, +properties.scale.y, 0.0, 0.0,
		0.0, 0.0, +properties.scale.z, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	var translation = mat4(
		1.0, 0.0, 0.0, +properties.translate.x,
		0.0, 1.0, 0.0, +properties.translate.y,
		0.0, 0.0, 1.0, +properties.translate.z,
		0.0, 0.0, 0.0, 1.0
	);
	var S = vec3(Math.sin(+properties.rotation.x), Math.sin(+properties.rotation.y), Math.sin(+properties.rotation.z));
	var C = vec3(Math.cos(+properties.rotation.x), Math.cos(+properties.rotation.y), Math.cos(+properties.rotation.z));
	var RotZXY =  mult(mult(mat4(
		C[2],-S[2], 0.0, 0.0,
		S[2], C[2], 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0),
	   mat4(1.0, 0.0, 0.0, 0.0,
		0.0, C[0],-S[0], 0.0,
		0.0, S[0], C[0], 0.0,
		0.0, 0.0, 0.0, 1.0)),
	   mat4(C[1], 0.0, S[1], 0.0,
		0.0, 1.0, 0.0, 0.0,
		-S[1],0.0, C[1], 0.0,
		0.0, 0.0, 0.0, 1.0));
	properties._matrix = mult(mult(translation,scale),RotZXY);
	properties._normal_matrix = flatten(transpose(inverse(properties._matrix)));
	properties._matrix = flatten(properties._matrix);
	console.log(properties._normal_matrix);
}
