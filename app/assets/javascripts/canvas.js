// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
"use strict";

const $shape_type = { CUBE: 0, CYLINDER: 1, CONE: 2, SPHERE: 3 };

var $shapes = [];

var lightdelta = 0.0;
var $uLightAngle;

var $gl;

var $fColour;
var $colour = [];

var $near = -10;
var $far = 10;
var radius = 6.0;
var $theta  = 0.0;
var $rotations = [];
var $uRotations;
var $translations = [];
var $uTranslations;
var $scale = [];
var $uScale;
var $shape = $shape_type.CUBE;
var $uProjection;

var $uAmbiant, $uDiffuse, $uSpecular, $uShiny;
var $uLightOne, $uLightTwo;

var $modeViewMatrix, $projectionMatrix;
var $modelViewMatrixLoc, $projectionMatrixLoc;
var $normalMatrixLoc;

var $all_verts = [];
var $all_normals = [];

//assumption, cylinder, cone, cube, sphere called in that order

//cylinder
{
	//top = 0-30 (31)
	$all_normals = [vec4(0.0,1.0,0.0,0.0)];
	$all_verts = [vec4(0.0,1.0,0.0)];
	for(var i = 0; i < 30; ++i) {
		var cos = Math.cos(Math.PI*i/14);
		var sin = Math.sin(Math.PI*i/14);
		$all_verts.push(vec4(cos, 1.0,sin));
		$all_normals.push(vec4(0.0, 1.0,0.0,0.0));
	}
	//bottom = 31 - 61  (31)
	$all_verts.push(vec4(0.0,-1.0,0.0));
	$all_normals.push(vec4(0.0,-1.0,0.0));
	for(var i = 0; i < 30; ++i) {
		var cos = Math.cos(Math.PI*i/14);
		var sin = Math.sin(Math.PI*i/14);
		$all_verts.push(vec4(cos, -1.0,sin));
		$all_normals.push(vec4(0.0, -1.0,0.0,0.0));
	}

	//bottom = 62 - 126  (64)
	for(var i = 0; i < 32; ++i) {
		var cos = Math.cos(Math.PI*i/14);
		var sin = Math.sin(Math.PI*i/14);
		$all_verts.push(vec4(cos, 1.0,sin));
		$all_verts.push(vec4(cos, -1.0,sin));
		$all_normals.push(vec4(cos, 0.0,sin,0.0));
		$all_normals.push(vec4(cos, 0.0,sin,0.0));
	}

}
//cone
{
	//bottom = 31 - 61  (31)
	//top = 126 - 215 (90)
	for(var i = 0; i < 30;) {
		var cos = Math.cos(Math.PI*i/14);
		var sin = Math.sin(Math.PI*i/14);
		$all_verts.push(vec4(cos, -1.0,sin));
		$all_normals.push(vec4(cos, 1.0,sin,0.0));
		i += 0.5;
		cos = Math.cos(Math.PI*i/14);
		sin = Math.sin(Math.PI*i/14);
		$all_verts.push(vec4(0.0, 1.0,0.0));
		$all_normals.push(vec4(cos, 1.0,sin,0.0));
		i += 0.5;
		cos = Math.cos(Math.PI*i/14);
		sin = Math.sin(Math.PI*i/14);
		$all_verts.push(vec4(cos, -1.0,sin));
		$all_normals.push(vec4(cos, 1.0,sin,0.0));
	}
}
//cube
{
	$all_verts.push(
		vec4(1.0,1.0,-1.0), vec4(-1.0,1.0,-1.0), vec4(1.0,-1.0,-1.0), vec4(1.0,-1.0,-1.0), vec4(-1.0,1.0,-1.0), vec4(-1.0,-1.0,-1.0),
		vec4(1.0,1.0,1.0), vec4(-1.0,1.0,1.0), vec4(1.0,-1.0,1.0), vec4(1.0,-1.0,1.0), vec4(-1.0,1.0,1.0), vec4(-1.0,-1.0,1.0),

		vec4(1.0,-1.0,1.0), vec4(-1.0,-1.0,1.0), vec4(1.0,-1.0,-1.0), vec4(1.0,-1.0,-1.0), vec4(-1.0,-1.0,1.0), vec4(-1.0,-1.0,-1.0),
		vec4(1.0,1.0,1.0), vec4(-1.0,1.0,1.0), vec4(1.0,1.0,-1.0), vec4(1.0,1.0,-1.0), vec4(-1.0,1.0,1.0), vec4(-1.0,1.0,-1.0),

		vec4(-1.0,1.0,1.0), vec4(-1.0,1.0,-1.0), vec4(-1.0,-1.0,1.0), vec4(-1.0,-1.0,1.0), vec4(-1.0,1.0,-1.0), vec4(-1.0,-1.0,-1.0),
		vec4(1.0,1.0,1.0), vec4(1.0,1.0,-1.0), vec4(1.0,-1.0,1.0), vec4(1.0,-1.0,-1.0), vec4(1.0,1.0,-1.0), vec4(1.0,-1.0,-1.0)
	);
	$all_normals.push(
		vec4(0.0,0.0,-1.0,0.0), vec4(0.0,0.0,-1.0,0.0), vec4(0.0,0.0,-1.0,0.0), vec4(0.0,0.0,-1.0,0.0), vec4(0.0,0.0,-1.0,0.0), vec4(0.0,0.0,-1.0,0.0),
		vec4(0.0,0.0,1.0,0.0), vec4(0.0,0.0,1.0,0.0), vec4(0.0,0.0,1.0,0.0), vec4(0.0,0.0,1.0,0.0), vec4(0.0,0.0,1.0,0.0), vec4(0.0,0.0,1.0,0.0),

		vec4(0.0,-1.0,0.0,0.0), vec4(0.0,-1.0,0.0,0.0), vec4(0.0,-1.0,0.0,0.0), vec4(0.0,-1.0,0.0,0.0), vec4(0.0,-1.0,0.0,0.0), vec4(0.0,-1.0,0.0,0.0),
		vec4(0.0,1.0,0.0,0.0), vec4(0.0,1.0,0.0,0.0), vec4(0.0,1.0,0.0,0.0), vec4(0.0,1.0,0.0,0.0), vec4(0.0,1.0,0.0,0.0), vec4(0.0,1.0,0.0,0.0),

		vec4(-1.0,0.0,0.0,0.0), vec4(-1.0,0.0,0.0,0.0), vec4(-1.0,0.0,0.0,0.0), vec4(-1.0,0.0,0.0,0.0), vec4(-1.0,0.0,0.0,0.0), vec4(-1.0,0.0,0.0,0.0),
		vec4(1.0,0.0,0.0,0.0), vec4(1.0,0.0,0.0,0.0), vec4(1.0,0.0,0.0,0.0), vec4(1.0,0.0,0.0,0.0), vec4(1.0,0.0,0.0,0.0), vec4(1.0,0.0,0.0,0.0)
	);
}
$all_verts = flatten($all_verts);
$all_normals = flatten($all_normals);

function draw_cone() {
	$gl.drawArrays( $gl.TRIANGLE_FAN, 32, 30);
	$gl.drawArrays( $gl.TRIANGLES, 126, 90);
}
function draw_cube() {
	$gl.drawArrays( $gl.TRIANGLES,216,36);
}
function draw_cylinder() {
	$gl.drawArrays( $gl.TRIANGLE_FAN, 0, 31);
	$gl.drawArrays( $gl.TRIANGLE_FAN, 31, 31);
	$gl.drawArrays( $gl.TRIANGLE_STRIP, 62, 64);
}

var draw_current = [draw_cube, draw_cylinder, draw_cone];

window.onload = function init()
{
	var canvas = document.getElementById( "gl-canvas" );

	$gl = WebGLUtils.setupWebGL( canvas );
	if ( !$gl ) { alert( "WebGL isn't available" ); }

	$gl.viewport( 0, 0, canvas.width, canvas.height );

	$gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	$gl.enable($gl.DEPTH_TEST);
	$gl.depthMask(true);
	$gl.depthFunc($gl.LEQUAL);
	$gl.enable($gl.POLYGON_OFFSET_FILL);
	$gl.polygonOffset(1.0, 2.0);

	var persp = perspective( 90.0,1.0,0.1,100.0);
	persp[2][2] = -persp[2][2];
	persp[3][2] = -persp[3][2];
	$gl.uniformMatrix4fv($uProjection,false,flatten(persp));

	var program = initShaders( $gl, "vertex-shader", "fragment-shader" );
	$gl.useProgram( program );

	var vNormalId = $gl.createBuffer();
	$gl.bindBuffer( $gl.ARRAY_BUFFER, vNormalId );
	var vNormal = $gl.getAttribLocation( program, "vNormal" );
	$gl.vertexAttribPointer( vNormal, 4, $gl.FLOAT, false, 0, 0 );
	$gl.enableVertexAttribArray( vNormal );


	var vBufferId = $gl.createBuffer();
	$gl.bindBuffer( $gl.ARRAY_BUFFER, vBufferId );

	var vPosition = $gl.getAttribLocation( program, "vPosition" );
	$gl.vertexAttribPointer( vPosition, 4, $gl.FLOAT, false, 0, 0 );
	$gl.enableVertexAttribArray( vPosition );


	$fColour = $gl.getUniformLocation(program, "fColour" );
	$uRotations = $gl.getUniformLocation(program, "uRotations" );
	$uTranslations = $gl.getUniformLocation(program, "uTranslations" );
	$uScale = $gl.getUniformLocation(program, "uScale" );
	$uProjection = $gl.getUniformLocation(program, "ProjectionMatrix" );

	$uAmbiant = $gl.getUniformLocation(program, "ambiant");
	$uDiffuse = $gl.getUniformLocation(program, "mat_diffuse");
	$uSpecular = $gl.getUniformLocation(program, "mat_specular");
	$uShiny = $gl.getUniformLocation(program, "shininess");
	$uLightAngle = $gl.getUniformLocation(program, "light_angle");
	$uLightOne = $gl.getUniformLocation(program, "light_one");
	$gl.uniform1f($uLightOne,1.0);
	$uLightTwo = $gl.getUniformLocation(program, "light_two");
	$gl.uniform1f($uLightTwo,1.0);
	$gl.uniform1f($uLightAngle,lightdelta);

	$uScale = $gl.getUniformLocation(program, "uScale" );


	$modelViewMatrixLoc = $gl.getUniformLocation( program, "modelViewMatrix" );
	$projectionMatrixLoc = $gl.getUniformLocation( program, "projectionMatrix" );
	$normalMatrixLoc = $gl.getUniformLocation( program, "NormalMatrix" );

	var persp = perspective( 90.0,1.0,0.1,100.0);
	//look in +z direction instead of -z
	persp[2][2] = -persp[2][2];
	persp[3][2] = -persp[3][2];
	$gl.uniformMatrix4fv($uProjection,false,flatten(persp));


	$gl.bufferData( $gl.ARRAY_BUFFER,flatten($all_verts), $gl.STATIC_DRAW);
	$gl.bindBuffer( $gl.ARRAY_BUFFER, vNormalId );
	$gl.bufferData( $gl.ARRAY_BUFFER,flatten($all_normals), $gl.STATIC_DRAW);



	$colour = flatten(vec3(255.0, 0.0, 0.0))
	$gl.uniform3fv($fColour, $colour );
	$rotations = flatten(vec3(0,0,0));
	$gl.uniform3fv($uRotations, $rotations );
	$translations = flatten(vec3(0,0,2));
	$gl.uniform3fv($uTranslations, $translations );
	$scale = flatten(vec3(1,1,1));
	$gl.uniform3fv($uScale, $scale );


	render();
	//debug_render();

}


function render()
{
	$gl.clear( $gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);

	for(var i = 0; i < $shapes.length; ++i) {
		var s = $shapes[i];
		$gl.uniform1f($uDiffuse,s.light.diffuse);
		$gl.uniform1f($uSpecular,s.light.specular);
		$gl.uniform1f($uShiny,s.light.shininess);
		$gl.uniform1f($uAmbiant,s.light.ambiant);
		$gl.uniform1f($uDiffuse,s.light.diffuse);
		$gl.uniform3f($fColour, s._colours.r, s._colours.g, s._colours.b);
		$gl.uniformMatrix4fv($modelViewMatrixLoc,false,s._matrix);
		$gl.uniformMatrix4fv($normalMatrixLoc,false,s._normal_matrix);
		draw_current[+s.shape_type]();
	}

	lightdelta += 0.05;
	$gl.uniform1f($uLightAngle,lightdelta);

	requestAnimFrame(render, 30);
}
function change_light_one(val) {
	$gl.uniform1f($uLightOne,val);

}
function change_light_two(val) {
	$gl.uniform1f($uLightTwo,val);
}
function debug_render() {
	$gl.clear( $gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);

	var line = [
		vec4( 0.1, -0.5  , 0.0),
		vec4( 0.1, -0.5  , 100.0),
		vec4(-0.1, -0.5  , 0.0),
		vec4(-0.1, -0.5  , 100.0)
		];
	$gl.bufferData( $gl.ARRAY_BUFFER, flatten(line) , $gl.STATIC_DRAW);
	$gl.uniform3fv($fColour, [0,0,0]);
	$gl.drawArrays($gl.LINES,0,4);


	var triangle = [
		vec4( 0.0, 1.0  , 3.0),
		vec4( 0.5, -0.733, 3.0),
		vec4(-0.5, -0.533, 3.0),

		vec4( 0.0, 1.0  , 6.0),
		vec4( 0.5, -0.733, 6.0),
		vec4(-0.5, -0.533, 2.0)
		];

	var gl_tri = flatten(triangle);
	$gl.bufferData( $gl.ARRAY_BUFFER, gl_tri , $gl.STATIC_DRAW);
	$gl.uniform3fv($fColour, [255,0,0]);
	$gl.drawArrays($gl.TRIANGLES,0,3);
	$gl.uniform3fv($fColour, [0,0,255]);
	$gl.drawArrays($gl.TRIANGLES,3,3);

	for(var i = 0; i < triangle.length; ++i) {
		var output_vec = mat_vec_mul(persp,triangle[i])
		for(var j = 0; j < 4; ++j) {
			output_vec[j] = output_vec[j]/output_vec[3];
		}

	}




}
function mat_vec_mul(mat,vec) {
	var ret = [0,0,0,0];
	for(var i = 0; i < 4; ++i) {
		var col = 0;
		for(var j = 0; j < 4; ++j) {
			col += mat[i][j]*vec[j];
		}
		ret[i] = col;
	}
	return ret;
}
//TODO: REST API to add and take from $shapes
