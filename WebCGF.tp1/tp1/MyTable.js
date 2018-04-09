/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
  constructor(scene)
  {
    super(scene);
    this.cube = new MyUnitCubeQuad(this.scene);
  };

  display()
  {
    //tampo
    this.scene.pushMatrix();
    this.scene.translate(4,3.70,3);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

    //pernas
    this.scene.pushMatrix();
    this.scene.translate(1.65,1.8,1.65);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.65,1.8,4.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(6.35,1.8,4.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(6.35,1.8,1.65);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();
  };
};
