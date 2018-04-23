/**
 * MyPaperPlane
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyPaperPlane extends CGFobject {
  constructor(scene, coord_x, coord_y, coord_z) {
    super(scene);

    this.x_position = coord_x;
    this.y_position = coord_y;
    this.z_position = coord_z;
    this.rotZ = -6.0;
    this.rotX = 0;
    this.flag = 0;

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
    this.vertices.push(0, 0, 0.5);
    this.vertices.push(0, 0, -0.5);
    this.vertices.push(-1.5, 0, 0);
    this.vertices.push(-1.5, 0, 0);
    this.vertices.push(0, 0, 0);
    this.vertices.push(0, -0.3, 0);
    this.vertices.push(-1.5, 0, 0);
    this.vertices.push(0, 0, 0);
    this.vertices.push(0, -0.3, 0);
    this.vertices.push(0, 0, 0.5);
    this.vertices.push(0, 0, -0.5);
    this.vertices.push(-1.5, 0, 0);

    this.indices.push(0,1,2);
    this.indices.push(3,5,4);
    this.indices.push(6,7,8);
    this.indices.push(11,10,9);

    this.normals.push(0,1,0);
    this.normals.push(0,1,0);
    this.normals.push(0,1,0);
    this.normals.push(0,0,1);
    this.normals.push(0,0,1);
    this.normals.push(0,0,1);
    this.normals.push(0,0,-1);
    this.normals.push(0,0,-1);
    this.normals.push(0,0,-1);
    this.normals.push(0,-1,0);
    this.normals.push(0,-1,0);
    this.normals.push(0,-1,0);
  };

  update(deltaTime) {
    if (this.flag == 0) //para ignorar o primeiro deltaTime que vai ser igual ao currTime
  		this.flag = 1;
    else if (this.x_position > 1.6) {
      this.x_position -= (deltaTime * (6/1000));
      this.y_position += (deltaTime * (0.5/1000));
    }
    else if (this.y_position > 0.125) {
      this.y_position -= (deltaTime *(6/1000));
      this.rotZ += (deltaTime * 2.5/10);
      this.rotX += (deltaTime * 5/10);
    }
    else {
      this.rotZ = 180;
      this.rotX = 0;
    }
  };
};
