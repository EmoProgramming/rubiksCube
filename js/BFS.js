export class BFS {
    constructor(cube) {
        this.cube = cube;
    }

    reconstructPath(curr, moves, visitedStates) {
        //console.log(curr);
        while (curr !== null) {
            curr = visitedStates.get(curr);
            
            if (curr.move !== null) {
                moves.push(curr.move);
            }
            curr = curr.previousState;
        }

        return moves;
    }

    handleIfSolved(beginningState, visitedStates) {

        let curr = this.cube.solvedState;
        //console.log(curr);

        let moves =[];
        this.reconstructPath(curr, moves, visitedStates)

        this.cube.statifyStringAndRender(beginningState);
        return moves.reverse();
    }

    solve(maxDepth) {

        let moves = [];

        if (maxDepth === undefined) {
            maxDepth = 5;
        }
        

        const beginningState = this.cube.getCurrentState();

        if (beginningState === this.cube.solvedState) {
            return [];
        }

        let thisWawe = [beginningState];
        let nextWawe = [];
        let waweCount = 0;

        let visitedStates = new Map();

        moves = this.#bfs(thisWawe, nextWawe, waweCount, maxDepth, visitedStates, moves, beginningState);

        //console.log(moves);
        if (moves.length ===0) {
            //console.log("nmot found");
            return "Not found";
        } else {
            //console.log("Solved");
            return moves;
        }

    }

    #bfs(thisWawe, nextWawe, waweCount, maxDepth, visitedStates, moves, beginningState) {

        visitedStates.set(beginningState, {
                previousState: null,
                move: null
            });

        while (thisWawe.length != 0) {


            for (const thisState of thisWawe) {

                this.cube.statifyString(thisState);

                for (const move of this.cube.MOVES) {

                    const oppostieMove = this.cube.getOppositeMove(move);
                    this.cube.moveWithoutAnimation(move);

                    const newState = this.cube.getCurrentState();
                    const previousState = visitedStates.get(newState);

                    if (previousState !== undefined) {
                        this.cube.moveWithoutAnimation(oppostieMove);
                        continue;
                    }

                    visitedStates.set(newState, {
                            previousState: thisState,
                            move: move
                        });

                    if (newState === this.cube.solvedState) {
                        return this.handleIfSolved(beginningState, visitedStates);
                    }

                    nextWawe.push(newState);
                    this.cube.moveWithoutAnimation(oppostieMove);
                    
                }

            }

        if (waweCount >= maxDepth) {
            return moves;
        }

        //console.log(nextWawe);

        waweCount += 1;
        thisWawe = [...nextWawe];
        nextWawe = [];

    }

    
}
}