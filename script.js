const boxes = document.querySelectorAll(".box");
const result = document.getElementById("result");
const turn = document.getElementById("turn");
const scoreX = document.getElementById("scoreX")
const scoreO = document.getElementById("scoreO")
let xWins = 0
let oWins = 0
const reset = document.getElementById("reset")
const scoreReset = document.getElementById("scoreReset")
let nextStartingPlayer = "X";

let currentPlayer = nextStartingPlayer
turn.textContent = "Player X's Turn";

let array = Array(9).fill(null);

boxes.forEach((box) => {
  box.addEventListener("click", function (event) {
    const button = Number(event.target.id);

    if (event.target.textContent !== "") {
      return;
    }

    array[button] = currentPlayer;

    event.target.textContent = currentPlayer;

    event.target.style.fontSize = "3rem";
    event.target.style.fontWeight = "bold";
    event.target.style.color = currentPlayer === "X" ? "white" : "red";

    if (checkWinner()) {
      return; 
    }

    checkDraw();
   

    currentPlayer =
      currentPlayer === "X"
        ? ((turn.textContent = "Player O's Turn"), "O")
        : ((turn.textContent = "Player X's Turn"), "X");
  });
});

const checkWinner = () => {
  if (
    (array[0] !== null && array[0] === array[1] && array[1] === array[2]) ||
    (array[3] !== null && array[3] === array[4] && array[4] === array[5]) ||
    (array[6] !== null && array[6] === array[7] && array[7] === array[8]) ||
    (array[0] !== null && array[0] === array[3] && array[3] === array[6]) ||
    (array[1] !== null && array[1] === array[4] && array[4] === array[7]) ||
    (array[2] !== null && array[2] === array[5] && array[5] === array[8]) ||
    (array[0] !== null && array[0] === array[4] && array[4] === array[8]) ||
    (array[2] !== null && array[2] === array[4] && array[4] === array[6])
  ) {
    result.textContent = `${currentPlayer} is Winner!`;
    result.classList.add("alert", "alert-danger");
    currentPlayer === "X" ? (xWins++, scoreX.textContent = xWins) : (oWins++, scoreO.textContent = oWins)
    boxes.forEach((box) => (box.disabled = true));
    setTimeout(resetGame, 2000);

    return true
  
  }

  return false

  
};

const resetGame = () => {
  array.fill(null);
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });

  
  nextStartingPlayer = nextStartingPlayer === "X" ? "O" : "X";
  currentPlayer = nextStartingPlayer;
  turn.textContent = `Player ${currentPlayer}'s Turn`;

  result.textContent = "";
  result.classList.remove("alert", "alert-danger");
};

const checkDraw = () => {
  if (!array.includes(null)) {
    result.textContent = "It's a Draw!";
    result.classList.add("alert", "alert-danger");
    setTimeout(resetGame, 2000);
  }
};


reset.addEventListener("click", function(){
  resetGame()
})

scoreReset.addEventListener("click", function(){
  scoreX.textContent = 0
  scoreO.textContent = 0
  xWins = 0
  oWins = 0
})