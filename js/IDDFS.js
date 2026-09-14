import { DFS } from "./DFS.js";

export class IDDFS {
    constructor(cube) {
        this.cube = cube;
    }

    solve(maxDepth) {
        if (maxDepth === undefined) {
            maxDepth = 5;
        }
        
        let moves = [];
        const DFSSolver = new DFS(this.cube);

        for (let depth = 1; depth <= maxDepth; depth++) {
            moves = DFSSolver.solve(depth)
            if (moves !== "Not found") {
                return moves;
            }
        }

        return "Not found";
        
    }
    
    
}