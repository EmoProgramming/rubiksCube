export class DFS {
    constructor(cube) {
        this.cube = cube;
    }

    solve(maxDepth) {
        const beginningState = this.cube.getCurrentState();
        const currDepth = 0;

        const visitedStates = new Map();
        const moves = [];

        const found = this.#dfs(visitedStates, currDepth, maxDepth-1, moves, null);

        if (found) {
            return moves;
        } else {
            return "Not found";
        }

    }

    #dfs(visitedStates, currDepth, maxDepth, moves, previousMove) {

        const state = this.cube.getCurrentState();

        if (this.cube.isSolved()) {
            return true;
        }

        if  (currDepth > maxDepth) {
            return false;
        }
        
        const previousDepth = visitedStates.get(state);

        if (previousDepth !== undefined && previousDepth <= currDepth) {
            return false;
        }

        visitedStates.set(state, currDepth);

        for (const move of this.cube.MOVES) {

            const oppositeMove = this.cube.getOppositeMove(move);

            if (previousMove !== null && move === this.cube.getOppositeMove(previousMove)) {
                continue;
            }
            
            this.cube.moveWithoutAnimation(move);
            moves.push(move);

            const found = this.#dfs(visitedStates, currDepth + 1, maxDepth, moves, move);

            if (found) {
                this.cube.moveWithoutAnimation(oppositeMove);
                return true;
            }

            this.cube.moveWithoutAnimation(oppositeMove);
            moves.pop();
            
        }

        return false;

    }
}