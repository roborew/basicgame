const squares = document.querySelectorAll(".square");
let turn = "player1";
let gameState = true;
let gameResult;
let playCount = [];

squares.forEach((element) => {
  element.addEventListener("click", addPlay, false);
});

function addPlay(element) {
  if (!element.target.innerHTML && gameState) {
    element.target.innerHTML = play();
    resultCheck();
  }
}

function resultCheck() {
  let winCombo = {
    accrossTop: [".sq1", ".sq2", ".sq3"],
    accrossMid: [".sq4", ".sq5", ".sq6"],
    accrossBot: [".sq7", ".sq8", ".sq9"],
    downLeft: [".sq1", ".sq4", ".sq7"],
    downMid: [".sq2", ".sq5", ".sq8"],
    downRight: [".sq3", ".sq6", ".sq9"],
    diagDown: [".sq1", ".sq5", ".sq9"],
    diagUp: [".sq7", ".sq5", ".sq3"],
  };
  for (let row in winCombo) {
    gameResult = checkRow(winCombo[row]);
    if (gameResult) {
      showResult(winCombo[row]);
      gameState = false;
      break;
    }
  }
  if (!gameResult) {
    playCount.push(1);
    console.log(playCount.length);
    if (playCount.length === 9) {
      noWinResult();
    }
  }
}

function play() {
  switch (turn) {
    case "player1":
      turn = "player2";
      return "<span class='player1'>X</span>";
    case "player2":
      turn = "player1";
      return "<span class='player2'>O</span>";
  }
}

function checkRow(row) {
  let check = false;
  let result1 = document.querySelector(row[0]).innerHTML;
  let result2 = document.querySelector(row[1]).innerHTML;
  let result3 = document.querySelector(row[2]).innerHTML;
  if (
    result1 &&
    result2 &&
    result3 &&
    result1 === result2 &&
    result2 === result3
  ) {
    check = true;
  }
  return check;
}

function showResult(row) {
  let winner;
  for (const element of row) {
    document.querySelector(element).style.backgroundColor = "green";
  }
  if (turn === "player2") {
    winner = "X";
  } else if (turn == "player1") {
    winner = "O";
  }
  document.querySelector(".results").innerText = `${winner} is the Winner!`;
}

function noWinResult() {
  if (confirm("Cats game!")) {
    clearBoard();
  } else {
    clearBoard();
  }
}

function clearBoard() {
  squares.forEach((element) => {
    element.innerHTML = "";
  });
  gameState = true;
}
