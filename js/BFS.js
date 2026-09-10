export class BFS {
    constructor(cube) {
        this.cube = cube;
    }

    reconstructPath(curr, moves, visitedStates) {
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

        let curr = this.solvedState;
        //console.log(curr);

        let moves =[];
        this.reconstructPath(curr, moves, visitedStates)

        this.statifyStringAndRender(beginningState);
        return moves.reverse();
    }

    doBFSWithMaxDepth(waweCountMax) {

        let moves = [];
        waweCountMax = 4;

        const beginningState = this.getCurrentState();
        let thisWawe = [beginningState];
        let nextWawe = [];
        let waweCount = 0;

        let visitedStates = new Map();

        moves = this.#bfs(thisWawe, nextWawe, waweCount, waweCountMax, visitedStates, moves, beginningState);

        //console.log(moves);
        if (moves.length ===0) {
            //console.log("nmot found");
            return "Not found";
        } else {
            //console.log("Solved");
            return moves;
        }

    }

    #bfs(thisWawe, nextWawe, waweCount, waweCountMax, visitedStates, moves, beginningState) {

        visitedStates.set(beginningState, {
                previousState: null,
                move: null
            });

        while (thisWawe.length != 0) {


            for (const thisState of thisWawe) {

                this.statifyString(thisState);

                for (const move of this.MOVES) {

                    const oppostieMove = this.getOppositeMove(move);
                    this.moveWithoutAnimation(move);

                    const newState = this.getCurrentState();
                    const previousState = visitedStates.get(newState);

                    if (previousState !== undefined) {
                        this.moveWithoutAnimation(oppostieMove);
                        continue;
                    }

                    visitedStates.set(newState, {
                            previousState: thisState,
                            move: move
                        });

                    if (newState === this.solvedState) {
                        return this.handleIfSolved(beginningState, visitedStates);
                    }

                    nextWawe.push(newState);
                    this.moveWithoutAnimation(oppostieMove);
                    
                }

            }

        if (waweCount >= waweCountMax) {
            return moves;
        }

        //console.log(nextWawe);

        waweCount += 1;
        thisWawe = [...nextWawe];
        nextWawe = [];

    }

    
}
}