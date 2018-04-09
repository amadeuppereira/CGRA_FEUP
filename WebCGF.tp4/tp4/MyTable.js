/**
 * MyTable
 * @constructor
 */
 class MyTable extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

    this.tableAppearance = new CGFappearance(this.scene);
    this.tableAppearance.setAmbient(0.4,0.2,0,1);
    this.tableAppearance.setDiffuse(0.8,0.4,0,1);
    this.tableAppearance.setSpecular(0.4,0.2,0,1);
    this.tableAppearance.loadTexture("../resources/images/table.png");

    this.shine = new CGFappearance(this.scene);
    this.shine.setAmbient(0.4,0.4,0.4,1);
    this.shine.setDiffuse(0.8,0.8,0.8,1);
    this.shine.setSpecular(0.8,0.8,0.8,1);
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
    this.tableAppearance.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();
	};
 };
