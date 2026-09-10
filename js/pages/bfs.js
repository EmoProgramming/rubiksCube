import { BFS } from "../BFS.js";
import { Cube } from "../cube.js";
import { Interface } from "../interface.js";

export function bfsPage() {
    const cube = new Cube();
    const cubeController = new Interface(cube);
    const solver = new BFS(cube);

    const depth = 4

    cube.scrambleCube(depth);
    
    const solution = solver.solve(5);

    console.log(solution);
}