import { MinHeap } from "./minHeap";

export class Astar {
    constructor(cube) {
        this.cube = cube;

    }

    heuristic(state) {
        return 0;
    }

    f(state, depth) {
        return depth + this.heuristic(state);
    }



    reconstructPath(moves, cameFrom) {
        //console.log(curr);
        let curr = this.cube.solvedState;

        while (curr !== null) {
            curr = cameFrom.get(curr);
            
            if (curr.move !== null) {
                moves.push(curr.move);
            }
            curr = curr.previousState;
        }

        return moves;
    }

    solve() {

        let moves = [];
        const depthScore = new Map();
        const minHeap = new MinHeap();
        const cameFrom = new Map();

        const beginningState = this.cube.getCurrentState();

        depthScore.set(beginningState, 0);
        minHeap.push({state: beginningState,
            depth: 0,
            f: this.f(beginningState, 0)
        });
        cameFrom.set(beginningState, {
            previousState:null,
            move:null
        });

        while (minHeap.size !== 0) {
            const current = minHeap.pop();

            this.cube.statifyString(current.state);

            if (this.cube.solvedState === current.state) {
                moves = this.reconstructPath(moves, cameFrom);
                console.log(moves);
                return moves;
            }

            for (const move of this.cube.MOVES) {

                const oppostieMove = this.cube.getOppositeMove(move);
                this.cube.moveWithoutAnimation(move);

                const newState = this.cube.getCurrentState();
                const newDepth = current.depth + 1;

                const fValue = this.f(newState, newDepth);

                const depthFromMap = depthScore.get(newState);

                if (depthFromMap !== undefined) {
                    if (depthFromMap > newDepth) {
                        depthScore.set(newState, newDepth);
                        minHeap.push({state:newState,
                            depth: newDepth,
                            f: fValue
                        });
                        cameFrom.set(newState, {
                            previousState:current.state,
                            move:move
                        });

                    }
                } else {
                    depthScore.set(newState, newDepth);
                    minHeap.push({state:newState,
                        depth: newDepth,
                        f: fValue
                    });
                    cameFrom.set(newState, {
                        previousState:current.state,
                        move:move
                    });
                }

                this.cube.moveWithoutAnimation(oppostieMove);
                

            }

        }


    }
}