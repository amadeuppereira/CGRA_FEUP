/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene)
	{
		super(scene);
    this.quad = new MyQuad(this.scene);
    this.quad.initBuffers();
	};

  display()
  {
    //frente
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    //cima
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-90 * Math.PI/180, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //baixo
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(90 * Math.PI/180, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //esquerda
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-90 * Math.PI/180, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //direita
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(90 * Math.PI/180, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //tras
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(-180 * Math.PI/180, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

  };

};
