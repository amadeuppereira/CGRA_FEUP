/**
 * MyVehicle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);

    this.chassi = new MyUnitCubeQuad(this.scene);
  };

  display(){
    this.scene.pushMatrix();
		this.chassi.display();
		this.scene.popMatrix();
  }

  update(deltaTime) {

  };
};
