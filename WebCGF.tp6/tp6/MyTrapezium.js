/**
 * MyTrapezium
 * @constructor
 */
class MyTrapezium extends CGFobject {
  constructor(scene) {
    super(scene);

		this.quad = new MyQuad(this.scene);
		this.triangle = new MyTriangle(this.scene);
  };

  display()
	{
		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(180 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad, 1, 0, 0);
		this.scene.translate(-0.5, 0, 0.5);
		this.scene.scale(2,1,1);
		this.quad.display();
		this.scene.popMatrix();

		// right face (ver melhor isto)
		this.scene.pushMatrix();
		this.scene.scale(Math.sqrt(2),1,1);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-35 * degToRad, 1, 0, 0);
		this.scene.translate(0, -0.4, 0.57);
		this.scene.scale(1,1.2,1);
		this.quad.display();
		this.scene.popMatrix();

		// left face
		this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//right triangle
		this.scene.pushMatrix();
		this.scene.translate(-0.5,-0.5,0.5);
		this.triangle.display();
		this.scene.popMatrix();

		//left triangle
		this.scene.pushMatrix();
		this.scene.rotate(180 * degToRad, 1, 0, 0);
		this.scene.rotate(90 * degToRad, 0, 0, 1);
		this.scene.translate(0.5,0.5,0.5);
		this.triangle.display();
		this.scene.popMatrix();

	};
};
