import { MinHeap } from "./minHeap.js";

export class ASTAR {
    constructor(cube) {
        this.cube = cube;

        this.corners = [
            "UFR", // 0 
            "URB", // 1 
            "UBL", // 2 
            "ULF", // 3 
            "DFR", // 4 
            "DRB", // 5 
            "DBL", // 6 
            "DLF"  // 7 
        ];

        this.beginningCorners = [...this.corners];

        this.cornerPermutations = {
            U:  [3, 0, 1, 2, 4, 5, 6, 7],
            "U'": [1, 2, 3, 0, 4, 5, 6, 7],

            D:  [0, 1, 2, 3, 5, 6, 7, 4],
            "D'": [0, 1, 2, 3, 7, 4, 5, 6],

            R:  [1, 5, 2, 3, 0, 4, 6, 7],
            "R'": [4, 0, 2, 3, 5, 1, 6, 7],

            L:  [0, 1, 3, 7, 4, 5, 2, 6],
            "L'": [0, 1, 6, 2, 4, 2, 7, 3],

            F:  [4, 1, 2, 0, 7, 5, 6, 3],
            "F'": [3, 1, 2, 7, 0, 5, 6, 4],
            
            B:  [0, 2, 6, 3, 4, 1, 5, 7],
            "B'": [0, 5, 1, 3, 4, 6, 2, 7]
        };
    }

    permutateCorners(move) {
        const permutation = this.cornerPermutations[move];

        const copyOfCorners = [...this.corners];

        for (let i = 0; i < permutation.length; i++) {
            const from = i;
            const to = permutation[i];
            this.corners[to] = copyOfCorners[from];
        }
        //console.log(move, this.corners);
    }

    getNumberOfIncorrectCorners(corners, beginningCorners) {
        const numberOfIncorrect = 0;
        for (let i = 0; i < corners; i++) {
            if (corners[i] !== beginningCorners[i]) {
                numberOfIncorrect += 1;
            }
        }
        return numberOfIncorrect;
    }

    heuristic(state) {
        return 0;
    }

    heuristicCorrectSides(state) {

        let numberOfRightColors = 0;

        for (let i = 0; i < state.length; i++) {
            if (i < 9 && state[i] === "W") {
                numberOfRightColors += 1;
            }
            if ((i >= 9 && i < 18) && state[i] === "Y") {
                numberOfRightColors += 1;
            }
            if ((i >= 18 && i < 27) && state[i] === "G") {
                numberOfRightColors += 1;
            }
            if ((i >= 27 && i < 36) && state[i] === "B") {
                numberOfRightColors += 1;
            }
            if ((i >= 36 && i < 45) && state[i] === "O") {
                numberOfRightColors += 1;
            }
            if ((i >= 45 && i < 54) && state[i] === "R") {
                numberOfRightColors += 1;
            }

        }

        //console.log(numberOfRightColors);
        return 54 - numberOfRightColors;
    }

    f(state, depth, heuristic) {
        return depth + heuristic(state);
    }

    fForCorners(depth, corners, beginningCorners, heuristic) {
        return depth + heuristic(corners, beginningCorners);
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

    handleIfSolved(beginningState, moves, cameFrom) {
        this.cube.statifyStringAndRender(beginningState);
        moves = this.reconstructPath(moves, cameFrom);
        return moves.reverse();
    }

    updateDataStructures(depthScore, minHeap, cameFrom, state, depth, fValue, previousState, move) {
        depthScore.set(state, depth);
        minHeap.push({state: state,
            depth: depth,
            f: fValue
        });
        cameFrom.set(state, {
            previousState: previousState,
            move: move
        });
    }

    solve(maxDepth) {
        //console.log("NUMBER OF STATES WITHOUT HEURISTIC");
        //let solution = this.AstarAlgorithm(maxDepth, this.heuristic);
        //console.log("NUMBER OF STATE WITH HEURISTIC, NUMBER OF RIGHT COLOR");
        //solution = this.AstarAlgorithm(maxDepth, this.heuristicCorrectSides);
        //console.log("NUMBER OF STATE WITH HEURISTIC, NUMBER OF RIGHT COLOR");
        let solution = this.AstarAlgorithm(maxDepth, this.getNumberOfIncorrectCorners);
        return solution;
    }

    AstarAlgorithm(maxDepth, heuristic) {

        let numberOfstate = 0;

        let moves = [];
        const cornerPermutations = new Map();
        const depthScore = new Map();
        const minHeap = new MinHeap();
        const cameFrom = new Map();

        const beginningState = this.cube.getCurrentState();

        cornerPermutations.set(beginningState, this.corners);

        this.updateDataStructures(depthScore, minHeap, cameFrom, beginningState, 0, this.f(beginningState, 0, heuristic),
                            null, null);

        while (minHeap.size !== 0) {
            const current = minHeap.pop();
            numberOfstate += 1;

            this.cube.statifyString(current.state);

            if (depthScore.get(current.state) > maxDepth) {
                continue;
            }

            if (current.depth !== depthScore.get(current.state)) {
                continue;
            }

            if (this.cube.solvedState === current.state) {
                console.log(numberOfstate);
                return this.handleIfSolved(beginningState, moves, cameFrom);
            }

            for (const move of this.cube.MOVES) {

                const oppostieMove = this.cube.getOppositeMove(move);
                this.cube.moveWithoutAnimation(move);

                this.permutateCorners(move);

                const newState = this.cube.getCurrentState();
                const newDepth = current.depth + 1;

                const depthFromMap = depthScore.get(newState);

                if (depthFromMap === undefined) {
                    cornerPermutations.set(newState, this.corners);
                }

                //const fValue = this.f(newState, newDepth, heuristic);
                const fValue = this.fForCorners(newDepth, this.corners, this.beginningCorners, heuristic);

                if ((depthFromMap !== undefined && depthFromMap > newDepth) || depthFromMap === undefined) {
                    this.updateDataStructures(depthScore, minHeap, cameFrom, newState, newDepth, fValue,
                            current.state, move);

                }

                this.cube.moveWithoutAnimation(oppostieMove);
                

            }

        }


    }
}