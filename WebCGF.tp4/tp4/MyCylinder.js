/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
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

  // console.log(this.normals);
  // console.log(this.vertices.length);
  // console.log(this.indices.length);
  // console.log(this.normals.length);

  this.primitiveType = this.scene.gl.TRIANGLES;

  this.initGLBuffers();
  };

  getVertices() {
    var angle = (2 * Math.PI) / this.slices;
    var stackSize = 1.0 / this.stacks;

    for (let k = 0; k < this.stacks; k += stackSize) {
      for (let i = 0; i < this.slices; i++) {
        this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), k);
        this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 0);
        this.texCoords.push(Math.cos(k * angle), Math.sin(k * angle));
      }
    }

    for (let k = 0; k < this.stacks; k++) {
      for (let i = 0; i < this.slices; i++) {

        if(k != 0 && i != 0) {
					this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i - 1, this.slices*(k-1) + i);
					this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i , this.slices*k + i);
					if(i == this.slices - 1) {
						this.indices.push(this.slices*(k-1) + i, this.slices*(k-1), this.slices*k + i);
						this.indices.push(this.slices*k + i, this.slices*(k-1), this.slices*k);
					}
				}

      }
    }
  };
};
