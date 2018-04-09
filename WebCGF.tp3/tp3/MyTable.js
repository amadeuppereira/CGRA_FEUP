/**
 * MyTable
 * @constructor
 */
 class MyTable extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

    this.wood = new CGFappearance(this.scene);
    this.wood.setAmbient(0.3,0.2,0.2,1);
    this.wood.setDiffuse(0.3,0.2,0.2,1);
    this.wood.setSpecular(0.1,0.1,0.1,1);

    this.shine = new CGFappearance(this.scene);
    this.shine.setAmbient(0.3,0.2,0.2,1);
    this.shine.setDiffuse(0.3,0.2,0.2,1);
    this.shine.setSpecular(1,1,1,1);
    this.shine.setShininess(120);

		this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
	};

	display()
	{

		// legs
		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
    this.shine.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
    this.shine.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
    this.shine.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
    this.shine.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		// table top
		this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
    this.wood.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();
	};
 };
