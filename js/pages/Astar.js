import { Astar } from "../ASTAR.js";
import { Cube } from "../cube.js";
import { Interface } from "../interface.js";

export function Astar() {
    const cube = new Cube();
    const cubeController = new Interface(cube);
    const solver = new Astar(cube);

    const depth = 4

    cube.scrambleCube(depth);
    
    const solution = solver.solve(5);

    console.log(solution);
}