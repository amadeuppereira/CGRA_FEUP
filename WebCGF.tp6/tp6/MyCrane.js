/**
 * MyCrane
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{
    constructor(scene)
	{
		super(scene);

		this.yRotation = 0;
		this.xRotation = 0;

		this.cylinder = new MyCylinder(this.scene,8,20);
		this.side = new MyCircle(scene, 12);

	};

	drawCraneComponents(){
		//Base Cylinder
		this.scene.pushMatrix();
		this.scene.rotate(this.yRotation,0,1,0);
		this.scene.pushMatrix();
		this.scene.scale(2,1,2);
		this.scene.rotate(-90 * degToRad,1,0,0);
		this.completeCylinder();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//Biggest Cylinder
		this.scene.pushMatrix();
		this.scene.rotate(this.yRotation,0,1,0);
		this.scene.rotate(30 * degToRad,1,0,0);
		this.scene.pushMatrix();
		this.scene.translate(0,1,-0.5);
		this.scene.scale(0.6,10,0.6);
		this.scene.rotate(- 90 * degToRad,1,0,0);
		this.completeCylinder();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//Turning Cylinder
		this.scene.pushMatrix();
		this.scene.rotate(this.yRotation,0,1,0);
		this.scene.pushMatrix();
		this.scene.translate(-0.5,10.4,5.4);
		this.scene.scale(1,0.8,0.8);
		this.scene.rotate(-90 * degToRad,0,0,1);
		this.scene.rotate(-90 * degToRad,1,0,0);
		this.scene.rotate(this.xRotation,0,0,1);
		this.completeCylinder();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//Hand Cylinder
		this.scene.pushMatrix();
		this.scene.rotate(this.yRotation,0,1,0);
		this.scene.pushMatrix();
		this.scene.translate(0,10.4,6.1);
		this.scene.pushMatrix();
		this.scene.rotate(this.xRotation,1,0,0);
		this.scene.scale(0.6,0.6,6);
		this.completeCylinder();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
	}

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
		this.drawCraneComponents();
		this.scene.popMatrix();
	}

	update(deltaTime){
		//para rodar o eixo dos y
		this.yRotation += 0.05;
		this.xRotation += 0.05;
	};
}