/**
 * MyWheel
 * @constructor
 */
class MyWheel extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices;
    this.stacks = stacks;

    this.front = new MyCircle(scene, 12);
    this.back = new MyCircle(scene, 12);
    this.sides = new MyCylinder(scene, 12, 1);

    this.materialDefault = new CGFappearance(scene);
  };

  display() {

    this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			this.front.display();
		this.scene.popMatrix();

    this.materialDefault.apply();

    this.scene.pushMatrix();
      this.scene.rotate(Math.PI, 0, 1, 0);
		  this.back.display();
    this.scene.popMatrix();

    this.sides.display();
  };

  update(deltaTime) {

  };
};
