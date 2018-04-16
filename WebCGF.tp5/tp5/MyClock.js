/**
 * MyClock
 * @constructor
 */
class MyClock extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices;
    this.stacks = stacks;

    this.front = new MyCircle(scene, 12);
    this.back = new MyCircle(scene, 12);

    this.hour = new MyClockHand(scene, 0.025, 0.35, 0.025);
    this.min = new MyClockHand(scene, 0.025, 0.55, 0.025);
    this.sec = new MyClockHand(scene, 0.025, 0.9, 0.025);


    this.sides = new MyCylinder(scene, 12, 1);

    this.materialDefault = new CGFappearance(scene);

    this.frontAppearance = new CGFappearance(scene);
		this.frontAppearance.setAmbient(0.3,0.3,0.3,1);
		this.frontAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.frontAppearance.setSpecular(0.8,0.8,0.8,1);
		this.frontAppearance.setShininess(120);
		this.frontAppearance.loadTexture("../resources/images/clock.png");

  };

  display() {

    this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			this.frontAppearance.apply();
			this.front.display();
		this.scene.popMatrix();

    this.materialDefault.apply();

    this.scene.pushMatrix();
      this.scene.rotate(Math.PI, 0, 1, 0);
		  this.back.display();
    this.scene.popMatrix();

    this.sides.display();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1.1);
      this.hour.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1.1);
      this.min.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1.1);
      this.sec.display();
    this.scene.popMatrix();


  };

  update(deltaTime) {

    let secPassed = deltaTime / 1000;


    this.hour.setAngle(360 * secPassed / (60*60*60));
    this.min.setAngle(360 * secPassed / (60*60));
    this.sec.setAngle(360 * secPassed / 60);
  };
};
