var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;
var TERRAIN_DIVISIONS = 8;

var FPS = 60;

var car_position_x = 3;
var car_position_z = 3;
var car_acceletarion = 0;
var turning = false;

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

		//Interface elements
		this.light0 = true;
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.eixos = true;
		this.speed = 3;

		// Scene elements
		this.car = new MyVehicle(this);

		this.altimetry= [[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.3 ],
						 [ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.3 ],
					     [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
                         [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
					     [ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
						 [ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0 ],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						 [ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.3 ]
						];

		this.terrain = new MyTerrain(this, TERRAIN_DIVISIONS, this.altimetry);
		// this.table = new MyTable(this);
		// this.wall = new Plane(this);
		// this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
		// this.floor = new MyQuad(this, 0, 10, 0, 12);
		//
		// this.prism = new MyPrism(this, 8, 20);
		// this.cylinder = new MyCylinder(this, 8, 20);
		// this.lamp = new MyLamp(this, 8, 20);
		// this.clock = new MyClock(this, 12);
		// this.paperplane = new MyPaperPlane(this,12,4,8);
		//
		// this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
		// this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		// Materials
		 this.materialDefault = new CGFappearance(this);

		// this.slidesAppearance = new CGFappearance(this);
		// this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		// this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
		// this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
		// this.slidesAppearance.setShininess(10);
		// this.slidesAppearance.loadTexture("../resources/images/slides.png");
		// this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		// this.boardAppearance = new CGFappearance(this);
		// this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
		// this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
		// this.boardAppearance.setSpecular(0.8,0.8,0.8,1);
		// this.boardAppearance.setShininess(120);
		// this.boardAppearance.loadTexture("../resources/images/board.png");

		// this.materialWall = new CGFappearance(this);
    // this.materialWall.setAmbient(0.5,0.3,0.8,1);
    // this.materialWall.setDiffuse(0.5,0.3,0.8,1);
    // this.materialWall.setSpecular(0.1,0.1,0.1,1);

		// this.floorAppearance = new CGFappearance(this);
		// this.floorAppearance.setAmbient(0.6,0.6,0.9,1);
		// this.floorAppearance.setDiffuse(0.6,0.6,0.9,1);
		// this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
		// this.floorAppearance.setShininess(120);
		// this.floorAppearance.loadTexture("../resources/images/floor.png");

		// this.windowAppearance = new CGFappearance(this);
    // this.windowAppearance.setAmbient(0.6,0.6,0.9,1);
    // this.windowAppearance.setDiffuse(0.6,0.6,0.9,1);
    // this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
		// this.windowAppearance.loadTexture("../resources/images/window.png");
		// this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

		// this.cylinderAppearance = new CGFappearance(this);
		// this.cylinderAppearance.loadTexture("../resources/images/textura.png");
		// this.cylinderAppearance.setAmbient(0.6,0.6,0.9,1);
    // this.cylinderAppearance.setDiffuse(0.6,0.6,0.9,1);
    // this.cylinderAppearance.setSpecular(0.1,0.1,0.1,1);

		this.setUpdatePeriod(1000/FPS);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light0)
			this.lights[0].enable();
		

		this.lights[1].setPosition(9, 6, 1, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light1)
			this.lights[1].enable();

		this.lights[2].setPosition(4, 6, 6, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light2)
			this.lights[2].enable();

		this.lights[3].setPosition(9, 6, 6, 1);
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
		
		//Car
		this.pushMatrix();
		this.translate(car_position_x,0.5,car_position_z);
		this.car.display();
		this.popMatrix();

		//Terrain
		this.pushMatrix();
		this.translate(5, 0, 5);
		this.scale(10, 1, 10);
		this.rotate(-90*degToRad, 1, 0, 0);
		this.terrain.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	checkKeys(){
		if (this.gui.isKeyPressed("KeyW")){
			car_acceletarion -= 0.01;
		}
		if (this.gui.isKeyPressed("KeyS")){
			car_acceletarion += 0.01;
		}
		if (this.gui.isKeyPressed("KeyA")){
			turning = true;
		}
		else if (this.gui.isKeyPressed("KeyD")){
			turning = true;
		}
		else{
			turning = false;
		}
		
	}

	update(currTime) {
		var today = new Date();

		currTime -= today.getTimezoneOffset()*60*1000;

		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		car_position_x += car_acceletarion;
		this.checkKeys();
		//turning = turning;
		this.car.update(this.deltaTime, car_acceletarion, turning);
	};

	doSomething() {
		console.log("Doing something...");
	}
};
