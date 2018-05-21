var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;
var TERRAIN_DIVISIONS = 8;

var FPS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.529, 0.808, 0.922, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.altimetry= [[ 20.0 , 20.0 , 20.0, 20.0, 20.5, 20.4, 20.3, 20.3, 20.3 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.3 ],
					     [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
                         [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
					     [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 20.0 , 20.0, 20.0, 20.5, 20.4, 20.3, 20.3, 20.3 ]
						];

		this.terrain = new MyTerrain(this, TERRAIN_DIVISIONS, this.altimetry);
		this.car = new MyVehicle(this, 25, 25, this.terrain);
		//this.car.attached = true;
		this.cylinder = new MyCylinder(this, 12, 1);
		this.trapezium = new MyTrapezium(this, 1, 1);
		this.semicircle = new MyLamp(this, 8, 20);
		this.crane = new MyCrane(this, this.car);
		this.position = new MyQuad(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.objectsTexture = new CGFappearance(this);
		this.objectsTexture.loadTexture("../resources/images/bandeiraPortugal.png");
		this.objectsTexture.setAmbient(0.6,0.6,0.9,1);
    	this.objectsTexture.setDiffuse(0.6,0.6,0.9,1);
		this.objectsTexture.setSpecular(0.1,0.1,0.1,1);

		//Interface elements
		this.light0 = true;
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.eixos = true;
		this.speed = 3;
		this.Cylinder = false;
		this.Trapezium = false;
		this.Semicircle = false;

		this.vehicleAppearances = [this.texture1, this.texture2, this.texture3, this.texture4];
		this.vehicleAppearanceList = {
			'LightMetal' : 0,
			'DarkMetal' : 1,
			'Red' : 2,
			'Water' : 3
		}
		this.vehicleTexture = 'Red';
		this.car.currVehicleAppearance = this.vehicleAppearanceList[this.vehicleTexture];

		this.setUpdatePeriod(1000/FPS);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(1, 1, 1, 1.0);

		this.lights[0].setPosition(25, 6, 25, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light0)
			this.lights[0].enable();
		

		this.lights[1].setPosition(25, 6, 75, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light1)
			this.lights[1].enable();

		this.lights[2].setPosition(75, 6, 25, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light2)
			this.lights[2].enable();

		this.lights[3].setPosition(75, 6, 75, 1);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light3)
			this.lights[3].enable();

	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if(this.light0)
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if(this.light1)
			this.lights[1].enable();
		else
			this.lights[1].disable();

		if(this.light2)
			this.lights[2].enable();
		else
			this.lights[2].disable();
			
		if(this.light3)
			this.lights[3].enable();
		else
			this.lights[3].disable();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.eixos)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		//Objects
		this.objectsTexture.apply();

		this.pushMatrix();
		this.rotate(90 * degToRad, 1, 0, 0);
		this.translate(2,-2,-3);
		this.scale(1,1,3);
		if(this.Cylinder)
			this.cylinder.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(8,0.5,-2);
		if(this.Trapezium)
			this.trapezium.display();
		this.popMatrix();

		this.pushMatrix();
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.translate(5,2,0);
		if(this.Semicircle)
			this.semicircle.display();
		this.popMatrix();
		
		//Car
		this.car.currVehicleAppearance = this.vehicleAppearanceList[this.vehicleTexture];
		if(!this.car.attached)
			this.car.display();

		//Terrain
		this.terrain.display();

		//Crane
		this.materialDefault.apply();
		// this.pushMatrix();
		// this.translate(25, 0, 25);
		this.crane.display();
		//this.popMatrix();
		
		//Position R
		this.materialDefault.apply();
		this.pushMatrix();
		this.translate(24,0.1,36);
		this.scale(7, 1, 4);
		this.rotate(-90*degToRad, 1, 0, 0);
		this.position.display();
		this.popMatrix();

		//Position D
		this.pushMatrix();
		this.translate(24,0.1,14);
		this.scale(7, 1, 4);
		this.rotate(-90*degToRad, 1, 0, 0);
		this.position.display();
		this.popMatrix();
		// ---- END Scene drawing section
	};

	checkKeys(){
		if (this.gui.isKeyPressed("KeyW")){
			this.car.car_velocity -= 0.01;
		}
		if (this.gui.isKeyPressed("KeyS")){
			this.car.car_velocity += 0.01;
		}
		if (this.gui.isKeyPressed("KeyA")){
			this.car.currentDirection = "left";
		}
		else if (this.gui.isKeyPressed("KeyD")){
			this.car.currentDirection = "right";
		}
		else{
			this.car.currentDirection = "none";
		}

		if(this.gui.isKeyPressed("KeyC")){
			this.crane.direction = "up";
		}
		else if(this.gui.isKeyPressed("KeyV")){
			this.crane.direction = "down";
		}
		else{
			this.crane.direction = "none";
		}
		if(this.gui.isKeyPressed("KeyB")){
			this.crane.direction2 = "right";
		}
		else if(this.gui.isKeyPressed("KeyN")){
			this.crane.direction2 = "left";
		}
		else{
			this.crane.direction2 = "none";
		}
	}

	update(currTime) {
		var today = new Date();

		currTime -= today.getTimezoneOffset()*60*1000;

		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		this.checkKeys();
		this.car.update(this.deltaTime);
		this.crane.update(this.deltaTime);
	};

	doSomething() {
		console.log("Doing something...");
	}
};
