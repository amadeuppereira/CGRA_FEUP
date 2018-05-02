/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
   constructor(scene, nrDivs)
   {
       super(scene, nrDivs, 0, 0, 0, 0);
       this.terrainAppearance = new CGFappearance(scene);
       this.terrainAppearance.loadTexture("../resources/images/terrainFloor.png");

   };

   display()
   {
    this.terrainAppearance.apply();
    super.display();
   };


};
