const playerRed = "R";
const playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;

const rows = 6;
const columns = 7;
let currColumns = []; //keeps track of which row each column is at.

const setGame = () => {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(" ");
            // HTML
            const tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            const boardEl = document.getElementById("board");
            if (boardEl) {
                boardEl.append(tile);
            }
        }
        board.push(row);
    }
};

const resetGame = () => {
    const boardEl = document.getElementById("board");
    const winnerEl = document.getElementById("winner");

    // Clear board tiles in DOM
    if (boardEl) {
        boardEl.innerHTML = "";
    }

    // Clear winner text
    if (winnerEl) {
        winnerEl.innerText = "";
    }

    // Reset state
    gameOver = false;
    currPlayer = playerRed;
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    // Rebuild board/grid
    setGame();
};

window.onload = () => {
    setGame();

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetGame);
    }
};

const setPiece = (event) => {
    if (gameOver) {
        return;
    }

    const target = event.currentTarget;
    if (!target) return;

    //get coords of that tile clicked
    const coords = target.id.split("-");
    let r = parseInt(coords[0]);
    const c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) {
        // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    const tile = document.getElementById(r.toString() + "-" + c.toString());
    if (!tile) return;

    if (currPlayer === playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
};

const checkWinner = () => {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r][c + 1] &&
                    board[r][c + 1] == board[r][c + 2] &&
                    board[r][c + 2] == board[r][c + 3]
                ) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r + 1][c] &&
                    board[r + 1][c] == board[r + 2][c] &&
                    board[r + 2][c] == board[r + 3][c]
                ) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r + 1][c + 1] &&
                    board[r + 1][c + 1] == board[r + 2][c + 2] &&
                    board[r + 2][c + 2] == board[r + 3][c + 3]
                ) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r - 1][c + 1] &&
                    board[r - 1][c + 1] == board[r - 2][c + 2] &&
                    board[r - 2][c + 2] == board[r - 3][c + 3]
                ) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
};

const setWinner = (r, c) => {
    const winner = document.getElementById("winner");
    if (!winner) {
        gameOver = true;
        return;
    }

    if (board[r][c] === playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
};