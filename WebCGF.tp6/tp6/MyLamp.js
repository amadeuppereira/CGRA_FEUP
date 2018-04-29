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


  // console.log(this.normals);
  // console.log(this.vertices.length / 3);
  // console.log(this.indices);
  // console.log(this.normals.length);

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
          //console.log((this.slices*k).toString() + " - " + (this.slices*(k-1) + i - 1).toString() + " - " + (this.slices*(k-1) + i).toString());

          if(i == this.slices - 1) {
            this.indices.push(this.slices*(k-1) + i, this.slices*(k-1), this.slices*k);
            //console.log((this.slices*(k-1) + i).toString() + " - " + (this.slices*(k-1)).toString() + " - " + (this.slices*k).toString());
          }
        }

        else if(k != 0 && i != 0) {
          this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i - 1, this.slices*(k-1) + i);
          this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i , this.slices*k + i);
          // console.log((this.slices*k + i - 1).toString() + " - " +(this.slices*(k-1) + i - 1).toString() + " - " + (this.slices*(k-1) + i).toString());
          // console.log((this.slices*k + i - 1).toString()+ " - " + (this.slices*(k-1) + i).toString() + " - " + (this.slices*k + i).toString());

          if(i == this.slices - 1) {
						this.indices.push(this.slices*(k-1) + i, this.slices*(k-1), this.slices*k + i);
						this.indices.push(this.slices*k + i, this.slices*(k-1), this.slices*k);
            // console.log((this.slices*(k-1) + i).toString()+ " - " + (this.slices*(k-1)).toString()+ " - " + (this.slices*k + i).toString());
            // console.log((this.slices*k + i).toString()+ " - " + (this.slices*(k-1)).toString()+ " - " + (this.slices*k).toString());
          }
				}

      }
    }

  };

};
