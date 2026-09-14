export class Interface {

    #cube;
    #movesElement;
    #solutionElement;

    constructor(cube) {
        this.#cube = cube;
        //this.moveWithKey();
        //this.addHint();
        //this.addScrambleButton();
        this.movesMade = [];

        this.#movesElement = document.querySelector("#movesMade");
        this.#solutionElement = document.querySelector("#solution");
    }

    #mapKeyToSide(key, shiftPressed) {
        const sides = {
            f: "F",
            r: "R",
            l: "L",
            d: "D",
            u: "U",
            b: "B"
        };

        let side = sides[key];

        if (shiftPressed) {
            side += "'";
        }

        return side;
    }


    moveWithKey() {

        document.addEventListener("keydown", async (event) => {

            const key = event.key.toLowerCase();
            const isUpper = event.shiftKey;


            if (!["f", "r", "u", "d", "l", "b"].includes(key)) {
                return;
            }
        
            const side = this.#mapKeyToSide(key, isUpper);
            
            const madeMove = await this.#cube.move(side);

            if (madeMove) {
                this.movesMade.push(side);
                this.showMovesMade();
            }
        });

    }

    showMovesMade() {
        this.#movesElement.textContent =
            `Moves made: ${this.movesMade.join(" ")}`;
    }

    scramble() {
        let depth = this.getDepthForScramble();

        if (!Number.isInteger(depth) || depth < 1) {
            depth = 5;
        }

        this.#cube.scrambleCube(depth);
    }


    getDepthForScramble() {
        const input = document.getElementById("scrambleDepth");

        if (input == null) {
            return null;
        }
        return Number(input.value);
        
    }

    showSolution(moves) {
        if (moves === "Not found") {
            this.#solutionElement.textContent = "Not found";
            return;
        };
        this.#solutionElement.textContent =
            `Solution: ${moves.join(" ")}`;
    }
}
