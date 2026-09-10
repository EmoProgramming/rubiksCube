import { Cube } from "./cube.js";

export class BFS {
    constructor(cube) {
        this.cube = cube;
    }

    reconstructPath(solvedCube, moves, visitedCubes) {

        let curr = solvedCube;
        console.log(curr);

        while (curr !== null) {
            let node = visitedCubes.get(curr.getCurrentState());
            console.log(node);
            
            if (node.move !== null) {
                moves.push(node.move);
            }
            curr = node.previousCube;
        }

        return moves;
    }

    handleIfSolved(solvedCube, visitedCubes) {

        let curr = solvedCube;
        //console.log(curr);
        //console.log(solvedCube);

        let moves =[];
        this.reconstructPath(solvedCube, moves, visitedCubes)

        this.statifyStringAndRender(solvedCube);
        return moves.reverse();
    }

    solve(waweCountMax) {

        let moves = [];
        waweCountMax = 4;

        const solvedCube = new Cube();

        let thisWawe = [this.cube];
        let nextWawe = [];
        let waweCount = 0;

        let visitedCubes = new Map();

        moves = this.#bfs(thisWawe, nextWawe, waweCount, waweCountMax, visitedCubes, moves, solvedCube);

        //console.log(moves);
        if (moves.length ===0) {
            //console.log("nmot found");
            return "Not found";
        } else {
            //console.log("Solved");
            return moves;
        }

    }

    #bfs(thisWawe, nextWawe, waweCount, waweCountMax, visitedCubes, moves, solvedCube) {

        visitedCubes.set(this.cube.getCurrentState(), {
                previousCube: null,
                move: null,
                cube: this.cube
            });

        while (thisWawe.length != 0) {


            for (const thisCube of thisWawe) {

                for (const move of this.cube.MOVES) {

                    const oppostieMove = this.cube.getOppositeMove(move);
                    thisCube.moveWithoutAnimation(move);

                    const newCube = thisCube.clone();
                    const previousCube = visitedCubes.get(newCube.getCurrentState());

                    if (previousCube !== undefined) {
                        thisCube.moveWithoutAnimation(oppostieMove);
                        continue;
                    }

                    visitedCubes.set(newCube.getCurrentState(), {
                            previousCube: thisCube,
                            move: move,
                            cube: newCube
                        });

                    if (newCube.getCurrentState() === solvedCube.getCurrentState()) {
                        return this.handleIfSolved(solvedCube, visitedCubes);
                    }

                    nextWawe.push(newCube);
                    thisCube.moveWithoutAnimation(oppostieMove);
                    
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