/**
 * MyTrapezium
 * @constructor
 */
class MyTrapezium extends CGFobject {
  constructor(scene, left, right) {
	super(scene);
	this.left = left || 0;
	this.right = right || 0;
	this.initBuffers();
  };

  initBuffers() {

	this.vertices = [
		// Front
		-0.5 - this.left, -0.5, 0.5, //0
		0.5 + this.right, -0.5, 0.5, //1
		-0.5, 0.5, 0.5,              //2
		0.5, 0.5, 0.5,               //3

		// Back
		-0.5 - this.left, -0.5, -0.5, //4
		0.5 + this.right, -0.5, -0.5, //5
		-0.5, 0.5, -0.5,     	      //6
		0.5, 0.5, -0.5,          	  //7

		// Left diagonal
		-0.5 - this.left, -0.5, 0.5, //8
		-0.5, 0.5, 0.5,              //9
		-0.5 - this.left, -0.5, -0.5, //10
		-0.5, 0.5, -0.5,     	      //11

		// Up
		-0.5, 0.5, 0.5,              //12
		0.5, 0.5, 0.5,               //13
		-0.5, 0.5, -0.5,     	      //14
		0.5, 0.5, -0.5,          	  //15

		// Right diagonal
		0.5 + this.right, -0.5, 0.5, //16
		0.5, 0.5, 0.5,               //17
		0.5 + this.right, -0.5, -0.5, //18
		0.5, 0.5, -0.5,          	  //19

		// Down
		-0.5 - this.left, -0.5, 0.5, //20
		0.5 + this.right, -0.5, 0.5, //21
		-0.5 - this.left, -0.5, -0.5, //22
		0.5 + this.right, -0.5, -0.5, //23

	];

	this.indices = [
		0, 1, 2,
		3, 2, 1,

		4, 6, 5,
		5, 6, 7,

		8, 9, 10,
		9, 11, 10,

		12, 13, 15,
		12, 15, 14,

		16, 18, 19,
		16, 19, 17,

		20, 22, 23,
		20, 23, 21
		
	];

	this.primitiveType = this.scene.gl.TRIANGLES;

	let a = Math.atan(1/this.left);
	let x1 = Math.cos(Math.PI/2 + a);
	let y1 = Math.sin(Math.PI/2 + a);

	let b = Math.atan(1/this.right);
	let x2 = Math.cos(Math.PI/2 - b);
	let y2 = Math.sin(Math.PI/2 - b);
		
	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,

		0, 0, -1,
		0, 0, -1,
		0, 0, -1,
		0, 0, -1,

		x1, y1, 0,
		x1, y1, 0,
		x1, y1, 0,
		x1, y1, 0,
	
		0, 1, 0, 
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,

		x2, y2, 0,
		x2, y2, 0,
		x2, y2, 0,
		x2, y2, 0,

		0, -1, 0, 
		0, -1, 0,
		0, -1, 0,
		0, -1, 0
	];



	this.texCoords = [
		0, 1,
		1, 1,
		this.left / (this.left + this.right + 1), 0,
		(this.left + 1) / (this.left + this.right + 1), 0,

		1, 1,
		0, 1,
		(this.right + 1) / (this.left + this.right + 1), 0,
		this.right / (this.left + this.right + 1), 0,

		1, 1,
		1, 0,
		0, 1,
		0, 0,

		0, 1,
		1, 1,
		0, 0,
		1, 0,

		0, 1,
		0, 0,
		1, 1,
		1, 0,

		0, 0,
		1, 0,
		0, 1,
		1, 1

	];

	this.initGLBuffers();
  };
};
