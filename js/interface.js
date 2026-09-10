export class Interface {

    #cube;

    constructor(cube) {
        this.#cube = cube;
        this.#moveWithKey();
    }

    #mapKeyToSide(key, shiftPressed) {
        let side;
        switch (key) {
            case "f":
                if (shiftPressed) {
                    side = "F'";
                } else {
                    side = "F";
                }
                break;

            case "r":
                if (shiftPressed) {
                    side = "R'";
                } else {
                    side = "R";
                }
                break;

            case "l":
                if (shiftPressed) {
                    side = "L'";
                } else {
                    side = "L";
                }
                break;

            case "d":
                if (shiftPressed) {
                    side = "D'";
                } else {
                    side = "D";
                }
                break;

            case "u":
                if (shiftPressed) {
                    side = "U'";
                } else {
                    side = "U";
                }
                break;

            case "b":
                if (shiftPressed) {
                    side = "B'";
                } else {
                    side = "B";
                }
                break;
        }

        return side;
    }


    #moveWithKey() {

        document.addEventListener("keydown", (event) => {

            const key = event.key.toLowerCase();
            const isUpper = event.shiftKey;


            if (["f", "r", "u", "d", "l", "b"].includes(key)) {
                const side = this.#mapKeyToSide(key, isUpper);
                this.#cube.move(side);
                }
        });

    }
}
