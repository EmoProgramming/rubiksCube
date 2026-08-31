class Cube {
    //PRIVATE
    #sides;
    #COLORS;
    #MOVES;




    constructor() {
        this.#COLORS = {
            W: "white",
            Y: "yellow",
            G: "green",
            B: "blue",
            O: "orange",
            R: "red"
        };

        this.#sides = {
            D: [
                ["W", "W", "W"],
                ["W", "W", "W"],
                ["W", "W", "W"]
            ],

            U: [
                ["Y", "Y", "Y"],
                ["Y", "Y", "Y"],
                ["Y", "Y", "Y"]
            ],

            F: [
                ["G", "G", "G"],
                ["G", "G", "G"],
                ["G", "G", "G"]
            ],

            B: [
                ["B", "B", "B"],
                ["B", "B", "B"],
                ["B", "B", "B"]
            ],

            L: [
                ["O", "O", "O"],
                ["O", "O", "O"],
                ["O", "O", "O"]
            ],

            R: [
                ["R", "R", "R"],
                ["R", "R", "R"],
                ["R", "R", "R"]
            ]
        };

        this.#MOVES = Object.freeze({
            U: "U",
            U_PRIME: "U'",
            U2: "U2",

            D: "D",
            D_PRIME: "D'",
            D2: "D2",

            F: "F",
            F_PRIME: "F'",
            F2: "F2",

            B: "B",
            B_PRIME: "B'",
            B2: "B2",

            L: "L",
            L_PRIME: "L'",
            L2: "L2",

            R: "R",
            R_PRIME: "R'",
            R2: "R2"
        });

        this.#setupKeyboard();
        this.#renderCube2D();
        this.#createCubies();
        this.#renderCube3D();
    }


    #setupKeyboard() {

        document.addEventListener("keydown", (event) => {

        const key = event.key.toLowerCase();
        const isUpper = event.shiftKey;

        if (["f", "r", "u", "d", "l", "b"].includes(key)) {
            this.move(key, isUpper);
            }
        });

    }

    move(key, shiftPressed) {
        switch (key) {
            case "f":
                this.#animateF();
                if (shiftPressed) {
                    this.#rotateFrontPrime();
                } else {
                    this.#rotateFront();
                }
                break;

            case "r":
                if (shiftPressed) {
                    this.#rotateRightPrime();
                } else {
                    this.#rotateRight();
                }
                break;

            case "l":
                if (shiftPressed) {
                    this.#rotateLeftPrime();
                } else {
                    this.#rotateLeft();
                }
                break;

            case "d":
                if (shiftPressed) {
                    this.#rotateDownPrime();
                } else {
                    this.#rotateDown();
                }
                break;

            case "u":
                if (shiftPressed) {
                    this.#rotateUpPrime();
                } else {
                    this.#rotateUp();
                }
                break;

            case "b":
                if (shiftPressed) {
                    this.#rotateBackPrime();
                } else {
                    this.#rotateBack();
                }
                break;
        }

        this.#renderCube2D();
        this.#renderCube3D();
    }

    logCube() {
        console.log(this.#sides);
    }

    #renderCube2D() {
        for (const key of Object.keys(this.#sides)) {

            const side = this.#sides[key];
            const sideHTML = document.querySelector(`.face.${key}`);
            
            for (let i = 0; i < sideHTML.children.length; i++) {

                const child = sideHTML.children[i];
                const row = Math.floor(i / 3); 
                const col = (i % 3);
                const colorKey = side[row][col];
                const color = this.#COLORS[colorKey];

                child.style.backgroundColor = color;

            }
        }
    }

    #renderCube3D() {
        this.#colorCubies();
    }



    #createEmptySide() {
        return [
            ["x", "x", "x"],
            ["x", "x", "x"],
            ["x", "x", "x"]
        ];
    }

    #rotateFacingSideRight(side) {
        const newSide = this.#createEmptySide();
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                newSide[y][2-x] = side[x][y];
            }
        }
        return newSide;
    }

    #getCol(side, index) {
        const col = [];
        for (let i = 0; i < side.length; i++) {
            const value = side[i][index];
            col.push(value);
        }

        return col;
    }

    #getRow(side, index) {
        const row = [];
        for (let i = 0; i < side.length; i++) {
            const value = side[index][i];
            row.push(value);
        }

        return row;
    }

    #setCol(side, index, data) {

        for (let i = 0; i < side.length; i++) {
            const valueToSet = data[i];
            side[i][index] = valueToSet;
        }

    }

    #setRow(side, index, data) {

        for (let i = 0; i < side.length; i++) {
            const valueToSet = data[i];
            side[index][i] = valueToSet;
        }
        
    }

    #getRightPart(side, part) {
        switch (part) {
            case "downRow": 
                return this.#getRow(side, 2)
            case "upRow":
                return this.#getRow(side, 0);
            case "leftCol":
                return this.#getCol(side, 0);
            case "rightCol":
                return this.#getCol(side, 2);
            default:
                console.log("Unknown part");
        }

    }

    #setRightPart(side, part, data) {
        switch (part) {
            case "downRow": 
                return this.#setRow(side, 2, data)
            case "upRow":
                return this.#setRow(side, 0, data);
            case "leftCol":
                return this.#setCol(side, 0, data);
            case "rightCol":
                return this.#setCol(side, 2, data);
            default:
                console.log("Unknown part");
        }
    }

    #rotateSide(sideMoves) {
        let dataForNextIter, data;
        const lastSide = sideMoves[sideMoves.length - 1].side;
        const lastPart = sideMoves[sideMoves.length - 1].part;
        dataForNextIter = this.#getRightPart(lastSide, lastPart);

        for (let i = 0; i < sideMoves.length; i++) {
            data = [...dataForNextIter];

            const currSide = sideMoves[i].side;
            const currPart = sideMoves[i].part;

            dataForNextIter = this.#getRightPart(currSide, currPart);

            if (sideMoves[i].reversed) {
                data.reverse();
            }

            this.#setRightPart(currSide, currPart, data);
        }
    }

    #rotateFront() {
        const facingSide = this.#sides.F;
        this.#sides.F = this.#rotateFacingSideRight(facingSide);
        const sideMoves = [
            {side:this.#sides.U, part:"downRow", reversed:true},
            {side:this.#sides.R, part:"leftCol", reversed:false},
            {side:this.#sides.D, part:"upRow", reversed:true},
            {side:this.#sides.L, part:"rightCol", reversed:false}
        ]

        this.#rotateSide(sideMoves);

    }

    #rotateFrontPrime() {
        this.#rotateFront();
        this.#rotateFront();
        this.#rotateFront();
    }

    #rotateRight() {
        const facingSide = this.#sides.R;
        this.#sides.R = this.#rotateFacingSideRight(facingSide);
        const sideMoves = [
            {side:this.#sides.F, part:"rightCol", reversed:false},
            {side:this.#sides.U, part:"rightCol", reversed:false},
            {side:this.#sides.B, part:"leftCol", reversed:true},
            {side:this.#sides.D, part:"rightCol", reversed:true}
        ]

        this.#rotateSide(sideMoves);
    }

    #rotateRightPrime() {
        this.#rotateRight();
        this.#rotateRight();
        this.#rotateRight();
    }

    #rotateLeft() {
        const facingSide = this.#sides.L;
        this.#sides.L = this.#rotateFacingSideRight(facingSide);
        const sideMoves = [
            {side:this.#sides.U, part:"leftCol", reversed:true},
            {side:this.#sides.F, part:"leftCol", reversed:false},
            {side:this.#sides.D, part:"leftCol", reversed:false},
            {side:this.#sides.B, part:"rightCol", reversed:true}
        ]

        this.#rotateSide(sideMoves);
    }

    #rotateLeftPrime() {
        this.#rotateLeft();
        this.#rotateLeft();
        this.#rotateLeft();
    }

    #rotateUp() {
        const facingSide = this.#sides.U;
        this.#sides.U = this.#rotateFacingSideRight(facingSide);
        const sideMoves = [
            {side:this.#sides.F, part:"upRow", reversed:false},
            {side:this.#sides.L, part:"upRow", reversed:false},
            {side:this.#sides.B, part:"upRow", reversed:false},
            {side:this.#sides.R, part:"upRow", reversed:false}
        ]

        this.#rotateSide(sideMoves);
    }

    #rotateUpPrime() {
        this.#rotateUp();
        this.#rotateUp();
        this.#rotateUp();
    }

    #rotateDown() {
        const facingSide = this.#sides.D;
        this.#sides.D = this.#rotateFacingSideRight(facingSide);
        const sideMoves = [
            {side:this.#sides.F, part:"downRow", reversed:false},
            {side:this.#sides.L, part:"downRow", reversed:false},
            {side:this.#sides.B, part:"downRow", reversed:false},
            {side:this.#sides.R, part:"downRow", reversed:false}
        ]

        this.#rotateSide(sideMoves);
    }

    #rotateDownPrime() {
        this.#rotateDown();
        this.#rotateDown();
        this.#rotateDown();
    }

    #rotateBack() {
        const facingSide = this.#sides.B;
        this.#sides.B = this.#rotateFacingSideRight(facingSide);
        const sideMoves = [
            {side:this.#sides.R, part:"rightCol", reversed:true},
            {side:this.#sides.U, part:"upRow", reversed:false},
            {side:this.#sides.L, part:"leftCol", reversed:true},
            {side:this.#sides.D, part:"downRow", reversed:false}
        ]

        this.#rotateSide(sideMoves);
    }

    #rotateBackPrime() {
        this.#rotateBack();
        this.#rotateBack();
        this.#rotateBack();
    }

    #addSidesToCubie(cubie) {
        const sides = [
            "front",
            "back",
            "left",
            "right",
            "up",
            "down"
        ];

        for (const side of sides) {
            const element = document.createElement("div");
            element.classList.add("cubie-side", side);

            cubie.appendChild(element);
        }

    }

    #createCubie(x, y, z) {
        const size = 90;
        const cubie = document.createElement("div");
        cubie.classList.add("cubie");

        cubie.position = {
            x, y, z
        };

        cubie.style.transform =
            `translate3d(${x * size}px, ${y * size}px, ${z * size}px)`

        this.#addSidesToCubie(cubie);

        return cubie;
    }

    #createCubies() {
        const cube = document.querySelector("#cube");

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {

                    if (x === 0 && y === 0 && z === 0) {
                        continue;
                    }

                    const cubie = this.#createCubie(x, y, z)
;
                    cube.appendChild(cubie);

                }
            }
        }
    }

    rotateCube() {
        const cube = document.querySelector("#cube");

        let isDragging = false;
        let previousX = 0;
        let previousY = 0;

        let rotationX = -20;
        let rotationY = 300;

        cube.addEventListener("mousedown", (event) => {
            isDragging = true;

            previousX = event.clientX;
            previousY = event.clientY;
        });

        document.addEventListener("mousemove", (event) => {
            if (!isDragging) return;

            const deltaX = event.clientX - previousX;
            const deltaY = event.clientY - previousY;

            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;

            cube.style.transform =
                `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

            previousX = event.clientX;
            previousY = event.clientY;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

    #getColorOfPart(side, row, col) {
        return this.#COLORS[this.#sides[side][row][col]];
    }

    #colorPartOfCubie(cubie, part, color) {
        const partOfCubie = cubie.querySelector(part);
        partOfCubie.style.backgroundColor = color;
    }

    #colorCubies() {
        const cube = document.querySelector("#cube");
        for (const cubie of cube.children) {
            console.log(cubie);
            const x = Number(cubie.position.x);
            const y = Number(cubie.position.y);
            const z = Number(cubie.position.z);
            //console.log(x, y, z);
            this.#colorCubie(cubie, x, y, z);
        }
    }

    #sideOfCubeToPartOfCubie(sideOfCube) {
            switch (sideOfCube) {
            case "F":
                return ".front";
                break;
            case "B":
                return ".back";
                break;
            case "R":
                return ".right";
                break;
            case "L":
                return ".left";
                break;
            case "D":
                return ".down";
                break;
            case "U":
                return ".up";
                break;
        }
    }

    #colorCubie(cubie, x, y, z) {

        const mapping = {
            "100" : {"R":[1, 1]},
            "-100" : {"L":[1, 1]},
            "010" : {"D":[1, 1]},
            "0-10" : {"U":[1, 1]},
            "001" : {"F":[1, 1]},
            "00-1" : {"B":[1, 1]},

            "011" : {"F":[2, 1], "D":[0, 1]},
            "0-11" : {"F":[0, 1], "U":[2, 1]},
            "0-1-1" : {"U": [0, 1], "B":[0, 1]},
            "01-1" : {"D":[2, 1], "B": [2, 1]},
            "110" : {"D":[1,2], "R": [2, 1]},
            "-110" : {"D":[1, 0], "L":[2, 1]},
            "1-10" : {"R":[0, 1], "U": [1, 2]},
            "-1-10" : {"L":[0, 1], "U":[1, 0]},
            "101" : {"F":[1, 2], "R":[1, 0]},
            "-101" : {"F": [1, 0], "L": [1, 2]},
            "-10-1" : {"L":[1, 0], "B":[1, 2]},
            "10-1" : {"R" : [1, 2], "B" : [1, 0]},

            "111" : {"F" : [2, 2], "R" : [2, 0], "D":[0, 2]},
            "1-11" : {"F":[0, 2], "R":[0, 0], "U":[2, 2]},
            "1-1-1" : {"R":[0, 2], "U":[0, 2], "B":[0, 0]},
            "11-1" : {"R":[2, 2], "B":[2, 0], "D":[2, 2]},
            "-1-11" : {"F" : [0, 0], "U":[2, 0], "L":[0, 2]},
            "-111" : {"F":[2, 0], "L":[2, 2], "D":[0, 0]},
            "-11-1" : {"L":[2, 0], "B":[2, 2], "D":[2, 0]},
            "-1-1-1" : {"U":[0, 0], "L":[0, 0], "B":[0, 2]}

        }

        const key = `${x}${y}${z}`;
        const data = mapping[key];


        if (key in mapping) {

            for (const [key, value] of Object.entries(data)) {
                const partOfCube = this.#sideOfCubeToPartOfCubie(key);
                const row = value[0];
                const col = value[1];
                const side = key;

                const color = this.#getColorOfPart(side, row, col);
                this.#colorPartOfCubie(cubie, partOfCube, color);
            }
        }
    }

    #rotateCoords(a, b) {
        return [b, -a];
    }

    #animateF() {
        const cube = document.querySelector("#cube");

        const layer = document.createElement("div");
        layer.classList.add("layer");

        for (const cubie of [...cube.children]) {;
            if (cubie.position.z == 1) {
                layer.appendChild(cubie);
            }
        }

        cube.appendChild(layer);

        layer.style.transform = "rotateZ(0deg)";

        layer.offsetHeight;

        layer.style.transform = "rotateZ(90deg)";

        
        
        layer.addEventListener("transitionend", () => {

        for (const cubie of [...layer.children]) {
            const x = cubie.position.x;
            const y = cubie.position.y;

            const [newX, newY] = this.#rotateCoords(x, y);

            cubie.position.x = newX;
            cubie.position.y = newY;

            cube.appendChild(cubie);
        }

        layer.remove();

        for (const cubie of [...cube.children]) {
            console.log(cubie);
        }
        

    });
    

    }

    #animateSide(side) {
        this.#animateF();
    }

}



function main() {
    const cube = new Cube();
    cube.rotateCube();
}

main();