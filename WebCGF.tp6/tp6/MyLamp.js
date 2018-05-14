/**
 * MyLamp
 * @constructor
 */
class MyLamp extends CGFobject {
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

  this.primitiveType = this.scene.gl.TRIANGLES;

  this.initGLBuffers();
  };

  getVertices() {
    var angle = (2 * Math.PI) / this.slices;
    var stackSize = 1.0 / this.stacks;

    for (let k = 0; k < 1; k += stackSize) {
      let alpha = Math.asin(k);

      for (let i = 0; i < this.slices; i++) {
        this.vertices.push(Math.cos(i*angle)*Math.cos(alpha), Math.sin(angle*i)*Math.cos(alpha), k);
        this.normals.push(Math.cos(i*angle)*Math.cos(alpha), Math.sin(angle*i)*Math.cos(alpha), k);
      }
    }
    //ponto final
    this.vertices.push(0, 0, 1);
    this.normals.push(0, 0, 1);

    for (let k = 0; k <= this.stacks; k++) {
      for (let i = 0; i < this.slices; i++) {

        if(k == this.stacks && k != 0 && i != 0) {
          this.indices.push(this.slices*k, this.slices*(k-1) + i - 1, this.slices*(k-1) + i);

          if(i == this.slices - 1) {
            this.indices.push(this.slices*(k-1) + i, this.slices*(k-1), this.slices*k);
          }
        }

        else if(k != 0 && i != 0) {
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
