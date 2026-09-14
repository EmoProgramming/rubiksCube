import { Cube } from "../cube.js";
import { Interface } from "../interface.js";
import { DFS } from "../DFS.js";

export async function dfsPage() {
    const cube = new Cube();
    const ui = new Interface(cube);
    const solver = new DFS(cube);

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