import { Cube } from "../cube.js";
import { Interface } from "../interface.js";

export function homePage() {
    const cube = new Cube();
    const ui = new Interface(cube);

    ui.moveWithKey();
    
    document.querySelector("#scrambleButton")
        .addEventListener("click", () => {
            ui.scramble();
        });
}