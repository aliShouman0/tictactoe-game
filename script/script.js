const images = document.querySelectorAll(".col img");
const playerTag = document.querySelector("#player");
const winBox = document.querySelector("#win");
const winName = document.querySelector("#winer");
const scoreYellowTag = document.querySelector("#scoreYellow");
const scoreRedTag = document.querySelector("#scoreRed");
const resetBtn = document.querySelector("#reset");

const redImg = "../assets/red.png";
const yellowImg = "../assets/yellow.png";
let player = 1;
let redScore = 0,
  yellowScore = 0;

// array with all value=-1 if red check will  1 and 2 yellow will be the index of gird from 0 to 8
let clicked = Array.from({ length: 9 }, () => -1);

images.forEach((img, i) => {
  img.addEventListener(
    "click",
    (img.ref = () => {
      game(img, i);
      console.log(clicked);
    })
  );
});

// EventListener for to star game
const game = (img, i) => {
  // if (player == 1) {
  img.src = redImg;
  player++;

  img.classList.remove("opacity");
  clicked[i] = player;
  checkWin();
  playerTag.textContent = player == 1 ? "Red" : "Yellow";
  scoreRedTag.textContent = redScore;
  scoreYellowTag.textContent = yellowScore;
  img.removeEventListener("click", img.ref);
  bestMove();
  // } else {
  // img.src = yellowImg;
  // player--;
  // }
};

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  let i = 0,
    j = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      // Is the spot available?
      ai = i + j;
      if (clicked[ai] == -1) {
        clicked[ai] = ai;
        let score = minimax(clicked, false);
        clicked[ai] = -1;
        if (score > bestScore) {
          bestScore = score;
          // move = { i, j };
        }
      }
    }
  }
  images[ai].src = yellowImg;
  player--;
  // currentPlayer = human;
  images[ai].classList.remove("opacity");
  clicked[ai] = player;

  playerTag.textContent = player == 1 ? "Red" : "Yellow";
  scoreRedTag.textContent = redScore;
  scoreYellowTag.textContent = yellowScore;
  images[ai].removeEventListener("click", images[ai].ref);
  checkWin();
}

let scores = {
  X: 10,
  O: -10,
  tie: 0,
};

function minimax(board, isMaximizing) {

  let result = checkWin1();
  if (result !== null) {
    return result;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        ai = i + j;
        if (board[ai] ==-1) {
          board[ai] = ai;
          let score = minimax(board, false);
          board[ai] = -1;
          // bestScore = max(score, bestScore);
          if (score > bestScore) {
            board = scores;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        ai = i + j;

        if (board[ai] == -1) {
          board[ai] = player - 1;
          let score = minimax(board, false);
          board[ai] = -1;
          if (score < bestScore) {
            bestScore = scores;
          }
        }
      }
    }
    return bestScore;
  }
}

// // EventListener for to star game
// const game = (img, i) => {
//   if (player == 1) {
//     img.src = redImg;
//     player++;
//   } else {
//     img.src = yellowImg;
//     player--;
//   }
//   img.classList.remove("opacity");
//   clicked[i] = player;
//   checkWin();
//   playerTag.textContent = player == 1 ? "Red" : "Yellow";
//   scoreRedTag.textContent = redScore;
//   scoreYellowTag.textContent = yellowScore;

//   img.removeEventListener("click", img.ref);
// };

// reset when win or full
const reset = () => {
  images.forEach((img, i) => {
    img.classList.add("opacity");
    clicked = Array.from({ length: 9 }, () => -1);
    img.addEventListener(
      "click",
      (img.ref = () => {
        game(img, i);
      })
    );
  });
};

// if wim add score reset game
const win = () => {
  images.forEach((img) => {
    img.removeEventListener("click", img.ref);
  });
  winBox.classList.remove("d-none");
  if (player == 1) {
    winName.textContent = "Yellow";
    redScore++;
  } else {
    winName.textContent = "Red";
    yellowScore++;
  }
  setTimeout(() => {
    winBox.classList.add("d-none");
    reset();
  }, 2000);
};

// check if win
const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    if (
      clicked[i] == clicked[i + 3] &&
      clicked[i + 3] == clicked[i + 6] &&
      clicked[i] != -1
    ) {
      win();
    }
  }

  for (let i = 0; i < 7; i += 3) {
    if (
      clicked[i] == clicked[i + 1] &&
      clicked[i + 1] == clicked[i + 2] &&
      clicked[i] != -1
    ) {
      win();
    }
  }

  if (
    clicked[0] == clicked[4] &&
    clicked[4] == clicked[8] &&
    clicked[8] != -1
  ) {
    win();
  }

  if (
    clicked[2] == clicked[4] &&
    clicked[4] == clicked[6] &&
    clicked[6] != -1
  ) {
    win();
  }

  //no win all full
  let i = 0;
  for (i = 0; i < clicked.length; i++) {
    if (clicked[i] == -1) {
      break;
    }
  }
  if (i == clicked.length) {
    setTimeout(reset, 1000);
  }
};

// reset all with score
resetBtn.addEventListener("click", () => {
  location.reload();
});

// check if win
const checkWin1 = () => {
  for (let i = 0; i < 3; i++) {
    if (
      clicked[i] == clicked[i + 3] &&
      clicked[i + 3] == clicked[i + 6] &&
      clicked[i] != -1
    ) {
      return clicked[i];
    }
  }

  for (let i = 0; i < 7; i += 3) {
    if (
      clicked[i] == clicked[i + 1] &&
      clicked[i + 1] == clicked[i + 2] &&
      clicked[i] != -1
    ) {
      return clicked[i];
    }
  }

  if (
    clicked[0] == clicked[4] &&
    clicked[4] == clicked[8] &&
    clicked[8] != -1
  ) {
    return clicked[0];
  }

  if (
    clicked[2] == clicked[4] &&
    clicked[4] == clicked[6] &&
    clicked[6] != -1
  ) {
    return clicked[2];
  }

  //no win all full
  let i = 0;
  for (i = 0; i < clicked.length; i++) {
    if (clicked[i] == -1) {
      break;
    }
  }
  if (i == clicked.length) {
    setTimeout(reset, 1000);
  }
  return null;
};
