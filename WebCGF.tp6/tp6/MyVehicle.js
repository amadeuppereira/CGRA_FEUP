/**
 * MyVehicle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);

    this.wheelMovement = 0;
    this.wheelRotate = 0;
    
    this.trapezium = new MyTrapezium(this.scene);
    this.wheel = new MyWheel(this.scene, 8, 20);
    this.lamp = new MyLamp(this.scene, 8, 20);
    this.cylinder = new MyCylinder(this.scene,8,20);
    this.cube = new MyUnitCubeQuad(this.scene);

    this.materialDefault = new CGFappearance(scene);
  };

  display(){
    //Chassi
    this.scene.pushMatrix();
    this.scene.translate(2,0.2,1.45);
    this.scene.scale(3, 0.7, 2);
		this.trapezium.display();
		this.scene.popMatrix();

    //Front Left Wheel
    this.scene.pushMatrix();
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.translate(0,0,2.3);
    this.scene.rotate(this.wheelRotate, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Front Right Wheel
    this.scene.pushMatrix();
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.rotate(this.wheelRotate, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Back Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(2.7,0.15,2.3);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Back Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(2.7,0.15,0);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
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

    this.materialDefault.apply();

    //Spoiler
    this.scene.pushMatrix();
    this.scene.scale(0.06,0.3,0.06);
    this.scene.rotate(-90 * degToRad,1,0,0);
    this.scene.translate(50,-15,1.8);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.06,0.3,0.06);
    this.scene.rotate(-90 * degToRad,1,0,0);
    this.scene.translate(50,-33,1.8);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.4,0.2,2.5);
    this.scene.translate(8,4.7,0.58);
    this.trapezium.display();
    this.scene.popMatrix();

    //Windows
    this.scene.pushMatrix();
    this.scene.scale(0.05,0.2,1);
    this.scene.translate(16,3.2,1.45);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.4,0.2,0.05);
    this.scene.rotate(-180 * degToRad,0,1,0);
    this.scene.translate(-2.45,3.2,-19);
    this.trapezium.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.4,0.2,0.05);
    this.scene.rotate(-180 * degToRad,0,1,0);
    this.scene.translate(-2.45,3.2,-39);
    this.trapezium.display();
    this.scene.popMatrix();
    }

  update(deltaTime, car_acceleration, turning) {
    this.wheelMovement -= (car_acceleration * 7/10);
    
    if(turning){
      this.wheelRotate -= (deltaTime * 3/ 1000);
    }
  };
};
