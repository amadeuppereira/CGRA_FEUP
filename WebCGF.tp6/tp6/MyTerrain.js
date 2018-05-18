/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
   constructor(scene, nrDivs, altimetry)
   {
       super(scene, nrDivs, 0, 0, 0, 0);

       this.scale = 100;

       if(altimetry == null)
        this.altimetry = this.getDefaultAltimetry();
       else
        this.altimetry = altimetry;

       this.applyAltimetry();

       //TODO normais
       
       this.terrainAppearance = new CGFappearance(scene);
       this.terrainAppearance.loadTexture("../resources/images/terrainFloor.png");

   };

   display() {

        this.scene.pushMatrix();
		this.scene.translate(this.scale/2, 0, this.scale/2);
		this.scene.scale(this.scale, 1, this.scale);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
        this.terrainAppearance.apply();
        super.display();
        this.scene.popMatrix();
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

        //TODO fix

        let vx = x / this.scale;
        let vy = y / this.scale;

        let div = 1 / this.nrDivs;
        let i = Math.floor(vx / div);
        let j = Math.floor(vy / div);
        
        if(i < this.nrDivs && j > this.nrDivs) {
            let a = this.altimetry[i][j];
            let b = this.altimetry[i+1][j];
            let c = this.altimetry[i][j+1];
            let d = this.altimetry[i+1][j+1];

            let e = (a * (1 - rx) + b * rx);
            let f = (c * rx + d * (1 - rx));

            let z = (e * (1 - rx) + f * ry);
            return z;
        }
        return this.altimetry[i][j];
   }


};
