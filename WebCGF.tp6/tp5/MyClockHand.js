/**
 * MyClockHand
 * @constructor
 */
class MyClockHand extends CGFobject
{
	constructor(scene, xs, ys, zs)
	{
		super(scene);
    this.xs = xs;
    this.ys = ys;
    this.zs = zs;
		this.angle = 0;

    this.angle = 0;
    this.hand = new MyCylinder(scene, 12, 20);

	};

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-this.angle, 0, 0, 1);
    this.scene.scale(this.xs, this.ys, this.zs);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.hand.display();
    this.scene.popMatrix();
  }

  setAngle(angle) {
    this.angle += angle*Math.PI/180.0;
  }
};
