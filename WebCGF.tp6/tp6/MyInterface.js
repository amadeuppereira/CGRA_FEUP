
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}

	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

		this.gui.add(this.scene, 'doSomething');

		// // add a group of controls (and open/expand by defult)

		// var group=this.gui.addFolder("Options");
		// group.open();

		// // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// // e.g. this.option1=true; this.option2=false;

		// group.add(this.scene, 'option1');
		// group.add(this.scene, 'option2');
		// group.add(this.scene, 'option3');

		var lights=this.gui.addFolder("Luzes");
		lights.open();

		lights.add(this.scene, 'light0');
		lights.add(this.scene, 'light1');
		lights.add(this.scene, 'light2');
		lights.add(this.scene, 'light3');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		//this.gui.add(this.scene, 'speed', -5, 5);

		this.gui.add(this.scene, 'eixos');

		this.gui.add(this.scene, 'vehicleTexture', ['LightMetal', 'DarkMetal', 'Red', 'Water']);

		var objects=this.gui.addFolder("Objetos");
		objects.open();

		objects.add(this.scene, 'Cylinder');
		objects.add(this.scene, 'Trapezium');
		objects.add(this.scene, 'Semicircle');

		this.initKeys();
		return true;
	};

	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}
	
	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}
};
