/**
 * MyVehicle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);

    this.chassi = new MyTrapezium(this.scene);
    this.wheel = new MyWheel(this.scene, 8, 20);
    this.lamp = new MyLamp(this.scene, 8, 20);
  };

  display(){
    //Chassi
    this.scene.pushMatrix();
    this.scene.translate(2,0.2,1.45);
    this.scene.scale(3, 0.7, 2);
		this.chassi.display();
		this.scene.popMatrix();

    //Front Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(0,0,2.3);
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Front Right Wheel
    this.scene.pushMatrix();
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Back Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(2.7,0.15,2.3);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Back Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(2.7,0.15,0);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Right Lamp
    this.scene.pushMatrix();
    this.scene.scale(0.25,0.1,0.25);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.scene.translate(3.5,-7,3);
    this.lamp.display();
    this.scene.popMatrix();

    //Left Lamp
    this.scene.pushMatrix();
    this.scene.scale(0.25,0.1,0.25);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.scene.translate(8,-7,3);
    this.lamp.display();
    this.scene.popMatrix();
  }

  update(deltaTime) {

  };
};
