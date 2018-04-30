/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
   constructor(scene, nrDivs)
   {
       super(scene, nrDivs, 0, 10, 0, 12);
       this.terrainAppearance = new CGFappearance(scene);
       this.terrainAppearance.loadTexture("../resources/images/floor.png");

   };

   display()
   {
    this.terrainAppearance.apply();
    super.display();
   };


};
