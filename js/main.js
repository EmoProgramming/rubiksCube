import { dfsPage } from "./pages/dfs.js";
import { bfsPage } from "./pages/bfs.js";
import { iddfsPage } from "./pages/iddfs.js";
import { Astar } from "./pages/Astar.js";

function main() {
    const page = document.body.dataset.page;

    if (page === "dfs") {
        dfsPage();
    } else if (page === "bfs") {
        bfsPage();
    } else if (page === "iddfs") {
        iddfsPage();
    } else if (page === "Astar") {
        Astar();
    }
}

main();