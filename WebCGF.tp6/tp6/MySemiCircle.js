/**
 * MySemiCircle
 * @constructor
 */
class MySemiCircle extends CGFobject {
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
    this.texCoords = [];

    this.getVertices();

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  };

  getVertices() {
    var angle_theta = (2 * Math.PI) / this.slices;
    var angle_fi = (Math.PI / 2) / this.stacks;

    for (let k = 0; k <= this.stacks; k++) {
      for (let i = 0; i <= this.slices; i++) {
        this.vertices.push(Math.cos(i*angle_theta)*Math.cos(k*angle_fi), Math.sin(angle_theta*i)*Math.cos(k*angle_fi), Math.sin(k*angle_fi));
        this.normals.push(Math.cos(i*angle_theta)*Math.cos(k*angle_fi), Math.sin(angle_theta*i)*Math.cos(k*angle_fi), Math.sin(k*angle_fi));
        this.texCoords.push(i*1/this.slices, k*1/this.stacks);
      }
    }

    var slices = this.slices + 1;

    for (let k = 0; k < this.stacks; k++) {
        for (let i = 0; i < this.slices; i++) {
          this.indices.push(k*slices+i, k*slices+(i+1), (k+1)*slices+i);
          this.indices.push(k*slices+(i+1), (k+1)*slices+(i+1), (k+1)*slices+i);
        }
    }
  };
};