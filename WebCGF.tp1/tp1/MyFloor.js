/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{
	constructor(scene)
	{
		super(scene);
    this.cube = new MyUnitCubeQuad(this.scene);
	};

  display()
  {

    this.scene.pushMatrix();
    this.scene.translate(4, 0.05, 3);
    this.scene.scale(8, 0.1, 6);
		this.cube.display();
    this.scene.popMatrix();


  };

};
