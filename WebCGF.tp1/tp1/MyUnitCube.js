/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
        //cima
				0.5, 0.5, 0.5, //frente direito
				0.5, 0.5, -0.5, //tras direito
				-0.5, 0.5, -0.5, //tras esquerdo
				-0.5, 0.5, 0.5, // frente esquerdo
        //baixo
				0.5, -0.5, 0.5, //frente direito
				0.5, -0.5, -0.5, //tras direito
				-0.5, -0.5, -0.5, //tras esquerdo
        -0.5, -0.5, 0.5 //frente esquerdo
				];

		this.indices = [
				//face cima
        0, 1, 3,
        1, 2, 3,
        //face baixo
        5, 7, 6,
        4, 7, 5,
        //face frente
        0, 3, 7,
        0, 7, 4,
        //face tras
        2, 1, 5,
        5, 6, 2,
        //face esquerda
        3, 2, 6,
        6, 7, 3,
        //face direita
        0, 4, 5,
        1, 0, 5
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
