import { ASTAR } from "../ASTAR.js";
import { Cube } from "../cube.js";
import { Interface } from "../interface.js";

export function AstarPage() {
    const cube = new Cube();
    const ui = new Interface(cube);
    const solver = new ASTAR(cube);

    ui.moveWithKey();

    document.querySelector("#scrambleButton")
        .addEventListener("click", () => {
            ui.scramble();
        });

    document.querySelector("#solveButton")
        .addEventListener("click", () => {
            const solution = solver.solve();

            ui.showSolution(solution);

            //console.log(solution);
        });
}