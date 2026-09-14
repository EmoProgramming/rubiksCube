import { BFS } from "../BFS.js";
import { Cube } from "../cube.js";
import { Interface } from "../interface.js";

export function bfsPage() {

    const cube = new Cube();
    const ui = new Interface(cube);
    const solver = new BFS(cube);

    ui.moveWithKey();

    document.querySelector("#scrambleButton")
        .addEventListener("click", () => {
            ui.scramble();
        });

    document.querySelector("#solveButton")
        .addEventListener("click", () => {
            const solution = solver.solve(8);

            ui.showSolution(solution);

            console.log(solution);
        });
}