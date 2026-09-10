import { Cube } from "./cube.js";

console.log("Tests started!");

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
    } catch (error) {
        console.log(`❌ ${name}`);
        console.error(error);
    }
}

test("nová kocka je vyriešená", () => {
    const cube = new Cube();

    if (!cube.isSolved()) {
        throw new Error("Nová kocka nie je vyriešená");
    }
});

test("After move R cube is not solved", () => {
    const cube = new Cube();
    cube.moveWithoutAnimation("R");

    if (cube.isSolved()) {
        throw new Error("New cube is solved");
    }
});

test("After moves R R' is solved", () => {
    const cube = new Cube();
    cube.moveWithoutAnimation("R");
    cube.moveWithoutAnimation("R'");

    if (!cube.isSolved()) {
        throw new Error("Cube is not solved");
    }
})


test("DFS works on 10 random scrambles with depth 5", () => {
    const cube = new Cube();
    const solvedState = cube.solvedState;

    //console.log(solvedState);

    const numberOfScrambles = 10;
    const maxDepth = 5;
    for (let i = 0; i < numberOfScrambles; i++) {
        cube.scrambleCube();
        //console.log(cube.getCurrentState());
        const moves = cube.doDFSWithMaxDepth(maxDepth);

        for (const move of moves) {
            cube.moveWithoutAnimation(move);
        }

        if (!cube.isSolved()) {
            throw new Error("Not solved after found moves by DFS");
        }
    }

})

test("BFS works on 10 random scrambles with depth 5", () => {
    const cube = new Cube();
    const solvedState = cube.solvedState;

    //console.log(solvedState);

    const numberOfScrambles = 10;
    const maxDepth = 5;
    for (let i = 0; i < numberOfScrambles; i++) {
        cube.scrambleCube();
        //console.log(cube.getCurrentState());
        const moves = cube.doBFSWithMaxDepth(maxDepth);

        for (const move of moves) {
            cube.moveWithoutAnimation(move);
        }

        if (!cube.isSolved()) {
            throw new Error("Not solved after found moves by DFS");
        }
    }

})