/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
   constructor(scene, nrDivs, altimetry)
   {
       super(scene, nrDivs, 0, 0, 0, 0);

       if(altimetry == null)
        this.altimetry = this.getDefaultAltimetry();
       else
        this.altimetry = altimetry;
        
        console.log(this.vertices);
        

       this.applyAltimetry();

       console.log(this.vertices);
       
       this.terrainAppearance = new CGFappearance(scene);
       this.terrainAppearance.loadTexture("../resources/images/terrainFloor.png");

   };

   display()
   {
    this.terrainAppearance.apply();
    super.display();
   };

   getDefaultAltimetry() {
      let arr = [];

      for(let i = 0; i <= this.nrDivs; i++) {
          arr.push([0])
          for(let j = 0; j <= this.nrDivs; j++) {
              arr[i][j] = 0;
          }
      }

      return arr;
   }

   applyAltimetry() {
      let count = 2;
      for(let i = 0; i < this.altimetry.length; i++) {
          for(let j = 0; j < this.altimetry[i].length; j++) {    
              this.vertices[count] = this.altimetry[i][j];
              count += 3; 
          }
      }

   }


};
