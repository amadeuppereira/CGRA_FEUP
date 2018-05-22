/**
 * MyWheel
 * @constructor
 */
class MyWheel extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices;
    this.stacks = stacks;

    this.rotZ = -6;
    this.rotX = 0;

    // Wheel Elements
    this.side = new MyCircle(scene, 12);
    this.cylinder = new MyCylinder(scene, 12, 1);

    // Textures
    this.wheelAppearance = new CGFappearance(scene);
		this.wheelAppearance.setAmbient(0.3,0.3,0.3,1);
		this.wheelAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.wheelAppearance.setSpecular(0.8,0.8,0.8,1);
		this.wheelAppearance.setShininess(120);
    this.wheelAppearance.loadTexture("../resources/images/wheel.png");

    this.wheel2Appearance = new CGFappearance(scene);
		this.wheel2Appearance.setAmbient(0.3,0.3,0.3,1);
		this.wheel2Appearance.setDiffuse(0.6,0.6,0.6,1);
		this.wheel2Appearance.setSpecular(0.8,0.8,0.8,1);
		this.wheel2Appearance.setShininess(120);
    this.wheel2Appearance.loadTexture("../resources/images/wheel2.png");
    
    this.materialDefault = new CGFappearance(scene);
  };

  display() {
    this.wheelAppearance.apply();

    // Left Side
    this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.side.display();
		this.scene.popMatrix();

    // Right Side
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
		this.side.display();
    this.scene.popMatrix();

    this.wheel2Appearance.apply();

    // Cylinder
    this.cylinder.display();
  };
};
