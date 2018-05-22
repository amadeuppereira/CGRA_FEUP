/**
 * MyVehicle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject {
  constructor(scene, x, z, terrain) {
    super(scene);

    // Car variables

    this.terrain = terrain || null;

    this.wheelMovement = 0;
    this.wheelRotate = 0;
    this.car_velocity = 0;

    this.car_position_x = x || 0;
    this.car_position_y = 0.5;
    this.car_position_z = z || 0;

    this.rotationY = 0;
    this.currentDirection = "none";

    this.onPosition = false; // True if the car is on position R to get picked by the crane
    this.attached = false; // True if the car is attached to the crane


    // Car elements
    this.trapezium = new MyTrapezium(this.scene, 1, 0.1);
    this.wheel = new MyWheel(this.scene, 8, 20);
    this.semiCircle = new MySemiCircle(this.scene, 8, 20);
    this.cylinder = new MyCylinder(this.scene, 8, 20);
    this.cube = new MyUnitCubeQuad(this.scene);


    //Textures
    this.materialDefault = new CGFappearance(scene);

    this.car_window_texture = new CGFappearance(scene);
    this.car_window_texture.loadTexture("../resources/images/black_texture.png");
    this.car_window_texture.setAmbient(0.6, 0.6, 0.9, 1);
    this.car_window_texture.setDiffuse(0.6, 0.6, 0.9, 1);
    this.car_window_texture.setSpecular(0.1, 0.1, 0.1, 1);

    this.lights_texture = new CGFappearance(scene);
    this.lights_texture.loadTexture("../resources/images/lights.png");
    this.lights_texture.setAmbient(0.6, 0.6, 0.9, 1);
    this.lights_texture.setDiffuse(0.6, 0.6, 0.9, 1);
    this.lights_texture.setSpecular(0.1, 0.1, 0.1, 1);

    this.landscape_texture = new CGFappearance(scene);
		this.landscape_texture.loadTexture("../resources/images/landscape.png");
		this.landscape_texture.setAmbient(0.6,0.6,0.9,1);
    this.landscape_texture.setDiffuse(0.6,0.6,0.9,1);
		this.landscape_texture.setSpecular(0.1,0.1,0.1,1);

		this.water_texture = new CGFappearance(scene);
		this.water_texture.loadTexture("../resources/images/water.png");
		this.water_texture.setAmbient(0.6,0.6,0.9,1);
    this.water_texture.setDiffuse(0.6,0.6,0.9,1);
		this.water_texture.setSpecular(0.1,0.1,0.1,1);

		this.red_texture = new CGFappearance(scene);
		this.red_texture.loadTexture("../resources/images/red.png");
		this.red_texture.setAmbient(0.6,0.6,0.9,1);
    this.red_texture.setDiffuse(0.6,0.6,0.9,1);
		this.red_texture.setSpecular(0.1,0.1,0.1,1);

		this.cr7_texture = new CGFappearance(scene);
		this.cr7_texture.loadTexture("../resources/images/cr7.png");
		this.cr7_texture.setAmbient(0.6,0.6,0.9,1);
    this.cr7_texture.setDiffuse(0.6,0.6,0.9,1);
    this.cr7_texture.setSpecular(0.1,0.1,0.1,1);
    
    this.vehicleAppearances = [this.landscape_texture, this.water_texture, this.red_texture, this.cr7_texture];
    this.currVehicleAppearance = 2;
  };

  drawCarComponents() {
    // Chassi
    this.scene.pushMatrix();
    this.scene.translate(-1.5, 0.2, 0);
    this.scene.scale(3, 0.7, 2);
    this.trapezium.display();
    this.scene.popMatrix();

    /////// Spoiler ///////
    this.scene.pushMatrix();
    this.scene.translate(-0.4, 0.5, -0.5);
    this.scene.scale(0.06, 0.3, 0.06);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.4, 0.5, 0.5);
    this.scene.scale(0.06, 0.3, 0.06);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.3, 0.9, 0);
    this.scene.scale(0.4, 0.2, 2.5);
    this.trapezium.display();
    this.scene.popMatrix();

    /////// Windows ///////
    this.car_window_texture.apply();
    this.scene.pushMatrix();
    this.scene.translate(-2.5, 0.65, 0);
    this.scene.scale(0.05, 0.2, 1);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.325, 0.65, -0.5);
    this.scene.scale(0.4, 0.2, 0.05);
    this.scene.rotate(-180 * degToRad, 0, 1, 0);
    this.trapezium.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.325, 0.65, 0.5);
    this.scene.scale(0.4, 0.2, 0.05);
    this.scene.rotate(-180 * degToRad, 0, 1, 0);
    this.trapezium.display();
    this.scene.popMatrix();

    // Front Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(-3.7, 0, 0.85);
    this.scene.scale(0.5, 0.5, 0.6);
    this.scene.rotate(this.wheelRotate, 0, 1, 0);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.wheel.display();
    this.scene.popMatrix();

    // Front Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(-3.7, 0, -1.45);
    this.scene.scale(0.5, 0.5, 0.6);
    this.scene.rotate(this.wheelRotate, 0, 1, 0);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.wheel.display();
    this.scene.popMatrix();

    // Back Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(-1, 0.15, 0.85);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    // Back Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(-1, 0.15, -1.45);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    // Right Light
    this.scene.pushMatrix();
    this.scene.translate(-5.5, -0.05, -0.6);
    this.scene.scale(0.25, 0.1, 0.25);
    this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.lights_texture.apply();
    this.semiCircle.display();
    this.scene.popMatrix();

    // Left Light
    this.scene.pushMatrix();
    this.scene.translate(-5.5, -0.05, 0.6);
    this.scene.scale(0.25, 0.1, 0.25);
    this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.lights_texture.apply();
    this.semiCircle.display();
    this.scene.popMatrix();
  }

  display() {
    this.vehicleAppearances[this.currVehicleAppearance].apply();
    this.scene.pushMatrix();
    if (!this.attached) {
      this.scene.translate(this.car_position_x, this.car_position_y, this.car_position_z);
      this.scene.rotate(this.rotationY * degToRad, 0, 1, 0);
    }
    this.drawCarComponents();
    this.scene.popMatrix();
  }

  update(deltaTime) {

    // Car center back positions
    let tempx = this.car_position_x + Math.cos(this.rotationY * degToRad) * (this.car_velocity * deltaTime * 1 / 50);
    let tempz = this.car_position_z -= Math.sin(this.rotationY * degToRad) * (this.car_velocity * deltaTime * 1 / 50);

    // Car center front positions
    let frontx = tempx - 5.9 * Math.cos(this.rotationY * degToRad);
    let frontz = tempz + 5.9 * Math.sin(this.rotationY * degToRad);
    
    // Checking if the car is in R position
    if(frontx > 20 && frontz > 35 && tempx < 27 && tempz < 37 && Math.abs(this.car_velocity) <= 0.1){
      this.onPosition = true;
      if(!this.attached)
        this.car_velocity = 0;
    }

    // Updating the car position when it isn't attached to the crane or in the R position
    if (!this.attached && !this.onPosition) {
      
      // Checking the terrain altimetry to avoid the car entering high terrain
      if(this.terrain != null){
        if (this.terrain.getHeightAt(tempx, tempz) != 0 ||
           this.terrain.getHeightAt(frontx, frontz) != 0) {  
         this.car_velocity = 0;      
          return;
        }
      }

      this.car_position_x = tempx;
      this.car_position_z = tempz
    }

    // Wheels Rotate Movement
    this.wheelMovement -= (this.car_velocity * deltaTime * 1 / 50);

    // Left Movement
    if (this.currentDirection == "left") {
      if (this.wheelRotate <= 0.4)
        this.wheelRotate += (deltaTime * 3 / 1000);
      this.rotationY -= (this.car_velocity * deltaTime * 1 / 10);
    }

    // Right Movement
    if (this.currentDirection == "right") {
      if (this.wheelRotate >= -0.4)
        this.wheelRotate -= (deltaTime * 3 / 1000);
      this.rotationY += (this.car_velocity * deltaTime * 1 / 10);
    }

    // Straight Movement
    if (this.currentDirection == "none") {
      // Aligning the wheels to the normal position
      if (this.wheelRotate > 0.1) {
        this.wheelRotate -= (deltaTime * 1 / 1000);
        this.rotationY -= (this.car_velocity * deltaTime * 1 / 10);
      }
      else if (this.wheelRotate < -0.1) {
        this.wheelRotate += (deltaTime * 1 / 1000);
        this.rotationY += (this.car_velocity * deltaTime * 1 / 10);
      }
      else
        this.wheelRotate = 0;
    }
  };
}
