
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

		this.gui.add(this.scene, 'FPS');

		var lights=this.gui.addFolder("Luzes");
		lights.open();

		lights.add(this.scene, 'light0');
		lights.add(this.scene, 'light1');
		lights.add(this.scene, 'light2');
		lights.add(this.scene, 'light3');

		this.gui.add(this.scene, 'eixos');

		this.gui.add(this.scene, 'vehicleTexture', ['Landscape', 'Water', 'Red', 'CR7']);

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
