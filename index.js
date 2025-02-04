const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer; //currentPlayer=X initially.
let gameGrid; //gamegrid is empty initially.

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//lets create a function to initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //UI par empty b karna hoga
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all"; //regaining cursor pointer
    //one more thing is missing, initialise boxes with css properties again.
    box.classList = `box box${index + 1}`; //initialised boxes css property
  });
  newGameBtn.classList.remove("active"); //initially it is not visible.
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer; //make changes in UI
    gameGrid[index] = currentPlayer; //make changes in gameGrid array.
    boxes[index].style.pointerEvents = "none"; //after current box is marked with the currentPlayer, cursor-pointer is no more available for that particular box.
    //swap karo turn ko
    swapTurn();
    //check karo koi jeet to nahi gaya.
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //UI Update
  gameInfo.innerText = `Current Player-${currentPlayer}`;
}

function checkGameOver() {
  let answer = ""; //winner variable
  winningPositions.forEach((position) => {
    //all 3 should be non-empty and exactly same value
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";

      //disable pointer event once we get winner
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we know X/O is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (answer !== "") {
    //it means we have a winner
    gameInfo.innerText = `Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //no winner found, when there is no winner or a tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tie";
    newGameBtn.classList.add("active");
  }
}

boxes.forEach((box, index) => {
  //on what box we have clicked based on index
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
