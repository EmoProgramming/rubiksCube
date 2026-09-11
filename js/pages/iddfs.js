import { IDDFS } from "../IDDFS.js";
import { Cube } from "../cube.js";
import { Interface } from "../interface.js";

export function iddfsPage() {
    const cube = new Cube();
    const cubeController = new Interface(cube);
    const solver = new IDDFS(cube);

    const depth = 4;

    cube.scrambleCube(depth);
    
    const solution = solver.solve(6);

    console.log(solution);
}