/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
   constructor(scene, nrDivs, altimetry)
   {
       super(scene, nrDivs, 0, 0, 0, 0);

       this.scale = 50;

       if(altimetry == null)
        this.altimetry = this.getDefaultAltimetry();
       else
        this.altimetry = altimetry;

       this.applyAltimetry();
       this.applyNormals();
       super.initGLBuffers();
       
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
   }

   applyNormals() {
    let count = 0;
    for(let i = 0; i < this.altimetry.length; i++) {
        for(let j = 0; j < this.altimetry[i].length; j++) {    
          let N = this.calculateNormal(i, j);
          this.normals[count] = N[0];
          this.normals[++count] = N[1];
          this.normals[++count] = N[2];
          count++;
        }
    }
   }

   calculateNormal(x, y) {
        let hL = this.getHeightAt(x-1, y);
        let hR = this.getHeightAt(x+1, y);
        let hD = this.getHeightAt(x, y-1);
        let hU = this.getHeightAt(x, y+1);

        let N = [0, 0, 0];
        N[0] = hL - hR;
        N[1] = hD - hU;
        N[2] = 2.0;

        let length = Math.sqrt((N[0]*N[0]) + (N[1]*N[1]) + (N[2]*N[2]));
        N[0] = N[0] / length;
        N[1] = N[1] / length;
        N[2] = N[2] / length;

        return N;
    }

    getHeightAt(x, y) {

        let terrainX = x/this.scale;
        let terrainY = y/this.scale;
        let gridSquareSize = 1 / this.nrDivs;
        let gridX = Math.floor(terrainX / gridSquareSize);
        let gridY = Math.floor(terrainY / gridSquareSize);

        if(gridX >= this.nrDivs || gridY >= this.nrDivs || gridX < 0 || gridY < 0)
            return 0;

        let xCoord = (terrainX % gridSquareSize)/gridSquareSize;
        let yCoord = (terrainY % gridSquareSize)/gridSquareSize;

        let a = this.altimetry[gridX][gridY];
        let b = this.altimetry[gridX+1][gridY];
        let c = this.altimetry[gridX][gridY+1];
        let d = this.altimetry[gridX+1][gridY+1];

        let e = (a * (1 - xCoord) + b * xCoord);
        let f = (c *xCoord + d * (1 - xCoord));

        let z = (e * (1 - xCoord) + f * yCoord);
        return z;

   }


};
