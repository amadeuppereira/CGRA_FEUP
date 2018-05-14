/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
   constructor(scene, nrDivs, altimetry)
   {
       super(scene, nrDivs, 0, 0, 0, 0);

       this.scale = 1;

       if(altimetry == null)
        this.altimetry = this.getDefaultAltimetry();
       else
        this.altimetry = altimetry;

       this.applyAltimetry();
       
       this.terrainAppearance = new CGFappearance(scene);
       this.terrainAppearance.loadTexture("../resources/images/terrainFloor.png");

   };

   display() {
        this.terrainAppearance.apply();
        super.display();
   }


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
            super.setVertexValue(count, this.altimetry[i][j]);
            count += 3; 
          }
      }
      super.initGLBuffers();
   }

   getHeightAt(x, y) {
        let ix = Math.floor(x) / this.scale;
        let iy = Math.floor(y) / this.scale;

        let rx = x - ix;
        let ry = y - iy;

        let div = 1 / this.nrDivs;
        let i = Math.floor(x / div);
        let j = Math.floor(y / div);

        let a = this.altimetry[i][j];
        let b = this.altimetry[i+1][j];
        let c = this.altimetry[i][j+1];
        let d = this.altimetry[i+1][j+1];

        let e = (a * (1 - rx) + b * rx);
        let f = (c * rx + d * (1 - rx));

        let z = (e * (1 - rx) + f * rz);
        return z;
   }


};
