import { dfsPage } from "./pages/dfs.js";
import { bfsPage } from "./pages/bfs.js";

function main() {
    const page = document.body.dataset.page;

    if (page === "dfs") {
        dfsPage();
    } else if (page === "bfs") {
        bfsPage();
    }
}

main();