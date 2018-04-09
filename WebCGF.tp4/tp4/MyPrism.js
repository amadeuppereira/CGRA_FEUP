/**
 * MyPrism
 * @constructor
 */
class MyPrism extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
  };

  initBuffers() {

  this.vertices = [];
  this.normals = [];
  this.indices = [];

  this.getVertices();

  // console.log(this.vertices.length);
  // console.log(this.indices.length);
  // console.log(this.normals.length);

  this.primitiveType = this.scene.gl.TRIANGLES;

  this.initGLBuffers();
};

getVertices() {
  var angle = (2*Math.PI) / this.slices;
  var stackSize = 1.0 / this.stacks;
  var vertIndice = 0

  for (let j = 0; j < this.stacks; j++) {

    for (let i = 0; i < this.slices; i++) {

      this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), j*stackSize);
      this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), j*stackSize + stackSize);
      this.vertices.push(Math.cos(i*angle + angle), Math.sin(i*angle + angle), j*stackSize);
      this.vertices.push(Math.cos(i*angle + angle), Math.sin(i*angle + angle), j*stackSize + stackSize);

			this.indices.push(vertIndice + 1, vertIndice, vertIndice + 2);
      this.indices.push(vertIndice + 1, vertIndice + 2, vertIndice + 3);
      vertIndice += 4;

      this.normals.push(Math.cos(i*angle + angle / 2.0), Math.sin(i*angle + angle / 2.0), 0);
      this.normals.push(Math.cos(i*angle + angle / 2.0), Math.sin(i*angle + angle / 2.0), 0);
      this.normals.push(Math.cos(i*angle + angle / 2.0), Math.sin(i*angle + angle / 2.0), 0);
      this.normals.push(Math.cos(i*angle + angle / 2.0), Math.sin(i*angle + angle / 2.0), 0);

    }
  }
};
};
