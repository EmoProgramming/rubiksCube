import { Cube } from "../cube.js";
import { Interface } from "../interface.js";
import { DFS } from "../DFS.js";

export async function dfsPage() {
    const cube = new Cube();
    const cubeController = new Interface(cube);
    const solver = new DFS(cube);

    const depth = 6;

    cube.scrambleCube(depth);
    
    const solution = solver.solve(6);

    console.log(solution);
}