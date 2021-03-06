/**
 * MyCrane
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{	
    constructor(scene, car)
	{
		super(scene);

		this.yRotation = 0;
		this.xRotation = 0;
		this.state = "default";

		// Elements
		this.cylinder = new MyCylinder(this.scene,8,20);
		this.side = new MyCircle(scene, 12);
		this.car = car;

		// Textures
		this.craneTexture = new CGFappearance(this.scene);
		this.craneTexture.loadTexture("../resources/images/crane.png");
		this.craneTexture.setAmbient(0.6,0.6,0.9,1);
    	this.craneTexture.setDiffuse(0.6,0.6,0.9,1);
		this.craneTexture.setSpecular(0.1,0.1,0.1,1);

		this.black_texture = new CGFappearance(this.scene);
		this.black_texture.loadTexture("../resources/images/black_texture.png");
		this.black_texture.setAmbient(0.6, 0.6, 0.9, 1);
		this.black_texture.setDiffuse(0.6, 0.6, 0.9, 1);
		this.black_texture.setSpecular(0.1, 0.1, 0.1, 1);
	};

	drawCraneComponents(){
		this.craneTexture.apply();

		//Base Cylinder
		this.scene.pushMatrix();
		this.scene.scale(2,1,2);
		this.scene.rotate(-90 * degToRad,1,0,0);
		this.completeCylinder();
		this.scene.popMatrix();

		//Biggest Cylinder
		this.scene.pushMatrix();
		this.scene.rotate(30 * degToRad,1,0,0);
		this.scene.translate(0,1,-0.5);
		this.scene.scale(0.6,10,0.6);
		this.scene.rotate(- 90 * degToRad,1,0,0);
		this.completeCylinder();
		this.scene.popMatrix();

		//Turning Cylinder
		this.scene.pushMatrix();
		this.scene.translate(-0.6,10.4,5.4);
		this.scene.scale(1.2,1,1);
		this.scene.rotate(-90 * degToRad,0,0,1);
		this.scene.rotate(-90 * degToRad,1,0,0);
		this.scene.rotate(this.xRotation,0,0,1);
		this.completeCylinder();
		this.scene.popMatrix();

		//Hand Cylinder
		this.scene.pushMatrix();
		this.scene.translate(0,10.4,6.1);
		this.scene.rotate(this.xRotation,1,0,0);
		this.scene.scale(0.6,0.6,6);
		this.completeCylinder();
		this.scene.popMatrix();

		this.black_texture.apply();

		//Cable
		this.scene.pushMatrix();
		this.scene.translate(0,4.5-Math.sin(this.xRotation)*6,5+Math.cos(this.xRotation)*7);
		this.scene.scale(0.1,6,0.1);
		this.scene.rotate(-90 * degToRad,1,0,0);
		this.completeCylinder();
		this.scene.popMatrix();

		//Magnet
		this.scene.pushMatrix();
		this.scene.translate(0,4.5-Math.sin(this.xRotation)*6,5+Math.cos(this.xRotation)*7);
		this.scene.scale(1,0.5,1);
		this.scene.rotate(-90 * degToRad,1,0,0);
		this.completeCylinder();
		this.scene.popMatrix();

		//Car
		if(this.car.attached){
			this.scene.pushMatrix();
			this.scene.translate(2,3.8-Math.sin(this.xRotation)*6,5+Math.cos(this.xRotation)*7);
			this.car.display();
			this.scene.popMatrix();
		}
	}

	// Creates a closed Cylinder 
	completeCylinder(){
		this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.side.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
  		this.scene.rotate(Math.PI, 0, 1, 0);
	  	this.side.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.cylinder.display();
		this.scene.popMatrix();
	}
	
	display(){
		this.scene.pushMatrix();
		this.scene.translate(25, 0, 25);
		this.scene.rotate(this.yRotation,0,1,0);
		this.drawCraneComponents();
		this.scene.popMatrix();
	}

	stateMachine() {
		if(this.state == "default") {
			if(this.car.onPosition && !this.car.attached) {
				this.state = "lowering";
			}
		} else if (this.state == "lowering") {
			if(this.car.attached) {
				this.state = "lifting";
			}
		} else if (this.state == "lifting") {
			if(this.xRotation == 0) {
				this.state = "rotating";
			}
		} else if (this.state == "rotating") {
			if(this.yRotation == -3.1) {
				this.state = "preparing_car";
			}
		} else if (this.state == "preparing_car") {
			if(!this.car.attached) {
				this.state = "droping_car";
			}
		}else if (this.state == "droping_car") {
			if(this.car.car_position_y == 0.5) {
				this.state = "reseting";
			}
		} else if (this.state == "reseting") {
			if(this.yRotation == 0) {
				this.state = "default";
			}
		}
	}

	update(deltaTime){
		this.stateMachine();
		
		// Lowering the magnet and catching the car
		if(this.state == "lowering"){
			if(this.xRotation < 0.57 && this.yRotation == 0){
				this.xRotation += (deltaTime * 1/5000);
				if(this.xRotation > 0.57)
					this.xRotation = 0.57;
			}
			else{
				this.car.attached = true;
			}
		}

		// Moving up the magnet with the car
		else if(this.state == "lifting"){
			if(this.xRotation > 0 && this.yRotation == 0){
				this.xRotation -= (deltaTime * 1/4000);
				if(this.xRotation < 0)
					this.xRotation = 0;
			}
		}

		// Rotating the crane with the car attached to the D position
		else if(this.state == "rotating") {
			if(this.xRotation <= 0 && this.yRotation > -3.1){
				this.yRotation -= (deltaTime * 1/2000);
				if(this.yRotation < -3.1)
					this.yRotation = -3.1;
			}
		}

		// Setting up the car to be released from the crane
		else if(this.state == "preparing_car"){
			this.car.onPosition = false;
			this.car.attached = false;
			this.car.car_position_x = 22;
			this.car.car_position_y = 3.8;
			this.car.car_position_z = 13;
			this.car.car_velocity = 0;
			this.car.rotationY = 180;
					
		}

		// Dropping the car and moving the crane to the original position
		else if(this.state == "droping_car"){
			if(this.car.car_position_y > 0.5){
				this.car.car_position_y -= (deltaTime * 1/80);
				if(this.car.car_position_y < 0.5)
					this.car.car_position_y = 0.5;
			}
		}

			// Making the crane go back to the original position
		else if(this.state == "reseting"){
			if(this.yRotation < 0){
				this.yRotation += (deltaTime * 1/2000);
				if(this.yRotation > 0){
					this.yRotation = 0;
				}
			}
		}
	};
}