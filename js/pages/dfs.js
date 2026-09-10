import { Cube } from "../cube.js";
import { Interface } from "../interface.js";
import { DFS } from "../DFS.js";

export function dfsPage() {
    const cube = new Cube();
    const cubeController = new Interface(cube);
    const solver = new DFS(cube);

    cube.scrambleCube();
    
    const solution = solver.solve(5);

    console.log(solution);
}