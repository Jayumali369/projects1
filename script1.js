// Select necessary elements
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

// Initialize the game board
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

// Change the turn and update the turn indicator
function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

// Check for winning condition
function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (
            boxes[a].innerHTML !== "" &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn} Wins!`;
            document.querySelector("#play-again").style.display = "inline";

            // Highlight winning cells
            condition.forEach(index => {
                boxes[index].style.background = "#08d9d6";
                boxes[index].style.color = "#000";
            });
            return;
        }
    }
}

// Check for a draw
function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(box => {
            if (box.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw!";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Reset the game
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });
});
