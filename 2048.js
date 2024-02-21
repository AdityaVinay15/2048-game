var board;
var score = 0;
var rows = 4;
var columns = 4;
var highscore = 0;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create two blocks randomly to start game
    setTwo();
    setTwo();
}



function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //to clear classlist ie., to nat have classes like x2 x4 x8...
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

//moving keys
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo(); //adds 2 after each slide
    }
    if (e.code == "ArrowRight") {
        slideRight();
        setTwo(); //adds 2 after each slide
    }
    if (e.code == "ArrowUp") {
        slideUp();
        setTwo(); //adds 2 after each slide
    }
    if (e.code == "ArrowDown") {
        slideDown();
        setTwo(); //adds 2 after each slide
    }
    document.getElementById("score").innerText = score;
    // if (score > highscore) {
    //     document.getElementById("highscore").innerText = highscore;
    // }
    documentgetElementById("highscore").innerText = highscore;

})

function filterZero(row) {
    return row.filter(num => num != 0); // creates a new array without zeroes
}


function slide(row) {
    row = filterZero(row); //[0,2,2,2] to get rid of zeroes

    //slide
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        } //[2,2,2]->[4,0,2]
    }

    row = filterZero(row); //[4,2]

    //add zeroes
    while (row.length < columns) {
        row.push(0); //[4,2,0,0]
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //atleast one zero on board
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //random r,c
        let r = Math.floor(Math.random() * rows); //0--1 *4->0.15->0
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }

}

highScore = localStorage.getItem('2048HighScore') || 0;

// Update high score function
function updateHighScore(currentScore) {
    // Compare with current high score
    if (currentScore > highScore) {
        // Update high score
        highScore = currentScore;

        // Store the new high score in local storage
        localStorage.setItem('2048HighScore', highScore);

        // Display the updated high score
        document.getElementById('highscore').textContent = 'High Score: ' + highScore;
    }
}