/**
 * MyVehicle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);

    this.chassi = new MyUnitCubeQuad(this.scene);
    this.wheel_front_left = new MyWheel(this.scene, 8, 20);
    this.wheel_front_right = new MyWheel(this.scene, 8, 20);
    this.wheel_back_left = new MyWheel(this.scene, 8, 20);
    this.wheel_back_right = new MyWheel(this.scene, 8, 20);
  };

  display(){
    //Chassi
    this.scene.pushMatrix();
    this.scene.translate(1.5,0.5,1.45);
    this.scene.scale(4, 1.2, 2);
		this.chassi.display();
		this.scene.popMatrix();

    //Front Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(0,0,2.3);
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel_front_left.display();
    this.scene.popMatrix();

    //Front Right Wheel
    this.scene.pushMatrix();
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel_front_right.display();
    this.scene.popMatrix();

    //Back Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(3,0,2.3);
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel_back_left.display();
    this.scene.popMatrix();

    //Back Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(3,0,0);
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel_back_right.display();
    this.scene.popMatrix();
  }

  update(deltaTime) {

  };
};
