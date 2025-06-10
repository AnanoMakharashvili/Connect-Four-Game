const buttonVsPlayer = document.getElementById("btn-vs-player");
const gameInterFace = document.getElementById("game-interface");
const firstPageOfGame = document.getElementById("first-page");
const logoOne = document.getElementById("logo-one");
const mainPage = document.getElementById("main");
const buttonRules = document.getElementById("btn-rules");
const gameRules = document.getElementById("rules");
const checkButton = document.getElementById("check-button");
const playerTurn = document.getElementById("player-turn");
const playerOneBackground = document.getElementById("turn-background-red");
const playerTwoBackground = document.getElementById("turn-background-yellow");
const timerSection = document.getElementById("timer");
const winnerContainer = document.getElementById("win-section");
const winPlayer = document.getElementById("win-player");
const playAgainBtn = document.getElementById("play-again-style");
const menu = document.getElementById("menu");
const modalContent = document.getElementById("modal");
const continueGameBtn = document.getElementById("continueGame");
const restartGameBtn = document.getElementById("restartGame");
const quitGameBtn = document.getElementById("quitGame");
const restart = document.getElementById("restart");
const bottomBg = document.getElementById("bottom-bg");
const footerBg = document.getElementById("main-footer-bg");
const customBg = document.getElementById("custom-bottom-bg");
const cpuGameButton = document.getElementById("btn-vs-cpu");
const boardSection = document.getElementById("board-section");
const playerScoreOne = document.getElementById("player-score-p1");
const playerScoreTwo = document.getElementById("player-score-p2");

let isVsCPU = false;

playAgainBtn.addEventListener("click", () => {
  resetBoard();
  resetLargeBoard();
});

cpuGameButton.addEventListener("click", () => {
  gameInterFace.style.display = "block";
  gameInterFace.style.display = "flex";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
  modalContent.style.display = "none";
  bottomBg.style.display = "block";

  startTurnTimer();
  updatePlayerTurnText();
  isVsCPU = true;
});

buttonVsPlayer.addEventListener("click", () => {
  gameInterFace.style.display = "block";
  gameInterFace.style.display = "flex";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
  modalContent.style.display = "none";
  bottomBg.style.display = "block";
  startTurnTimer();
  updatePlayerTurnText();
  isVsCPU = false;
});

buttonRules.addEventListener("click", () => {
  gameRules.style.display = "block";
  gameRules.style.display = "flex";
  gameInterFace.style.display = "none";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
});

checkButton.addEventListener("click", () => {
  gameRules.style.display = "none";
  gameInterFace.style.display = "none";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
  mainPage.style.display = "none";
  mainPage.style.display = "flex";
  firstPageOfGame.style.display = "flex";
  firstPageOfGame.style.gap = "30px";
  logoOne.style.display = "block";
  modalContent.style.display = "none";
});

menu.addEventListener("click", () => {
  modalContent.style.display = "flex";
});

continueGameBtn.addEventListener("click", () => {
  modalContent.style.display = "none";
});

restartGameBtn.addEventListener("click", () => {
  gameInterFace.style.display = "flex";
  modalContent.style.display = "none";
  redWins = 0;
  yellowWins = 0;
  playerScoreOne.textContent = "0";
  playerScoreTwo.textContent = "0";
  resetBoard();
  resetLargeBoard();
});

restart.addEventListener("click", () => {
  gameInterFace.style.display = "flex";
  modalContent.style.display = "none";
  resetBoard();
  resetLargeBoard();
  redWins = 0;
  yellowWins = 0;
  playerScoreOne.textContent = "0";
  playerScoreTwo.textContent = "0";
});

quitGameBtn.addEventListener("click", () => {
  firstPageOfGame.style.display = "block";
  firstPageOfGame.style.display = "flex";
  logoOne.style.display = "block";
  gameInterFace.style.display = "none";
  resetBoard();
  resetLargeBoard();
});

const cols = 7;
const rows = 6;
const cellSize = 48;
let currentPlayer = "red";

const boardState = Array.from({ length: rows }, () => Array(cols).fill(null));

let redWins = 0;
let yellowWins = 0;

playerScoreOne.textContent = "0";
playerScoreTwo.textContent = "0";

boardSection.addEventListener("click", (e) => {
  const rect = boardSection.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickedCol = Math.floor(clickX / cellSize);

  console.log(`Clicked column: ${clickedCol}`);

  for (let row = rows - 1; row >= 0; row--) {
    if (!boardState[row][clickedCol]) {
      boardState[row][clickedCol] = currentPlayer;

      const token = document.createElement("img");
      token.src = `assets/images/counter-${currentPlayer}-small.svg`;
      token.classList.add("token");

      const xOffset = (boardSection.clientWidth - cols * cellSize) / 2;
      const yOffset = (boardSection.clientHeight - rows * cellSize) / 2;

      token.style.left = `${clickedCol * cellSize + xOffset}px`;
      token.style.top = `${row * cellSize + yOffset}px`;

      console.log(
        `Placing token at: (${token.style.left}, ${token.style.top})`
      );

      const topLayer = document.getElementById("board-image");

      boardSection.insertBefore(token, topLayer);

      if (checkWinner(row, clickedCol, currentPlayer)) {
        clearInterval(timerInterval);

        if (currentPlayer === "red") {
          redWins++;
          playerScoreOne.textContent = redWins;
          bottomBg.style.display = "none";
          footerBg.style.display = "none";
          customBg.style.display = "block";
        } else {
          yellowWins++;
          playerScoreTwo.textContent = yellowWins;
          bottomBg.style.display = "none";
          footerBg.style.display = "block";
          customBg.style.display = "none";
        }

        setTimeout(() => {
          playerTurn.style.display = "none";
          playerOneBackground.style.display = "none";
          playerTwoBackground.style.display = "none";
          timerSection.style.display = "none";

          winPlayer.textContent =
            currentPlayer === "red" ? "PLAYER 1" : "PLAYER 2";
          winnerContainer.style.display = "flex";
        }, 100);

        return;
      }

      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      startTurnTimer();
      updatePlayerTurnText();
      if (isVsCPU && currentPlayer === "yellow") {
        setTimeout(makeCpuMove, 500);
      }
      break;
    }
  }
});

let countdown = 30;
let timerInterval;

function startTurnTimer() {
  const timerElement = document.querySelector(".timer");
  countdown = 30;

  if (timerElement) {
    timerElement.textContent = `${countdown}s`;
  }

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    countdown--;
    if (timerElement) {
      timerElement.textContent = `${countdown}s`;
    }

    if (countdown <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function updatePlayerTurnText() {
  if (currentPlayer === "red") {
    playerTurn.textContent = "PLAYER 1’S TURN";
    playerOneBackground.style.display = "block";
    playerTwoBackground.style.display = "none";
  } else {
    playerTurn.textContent = "PLAYER 2’S TURN";
    playerOneBackground.style.display = "none";
    playerTwoBackground.style.display = "block";
  }
}

function checkWinner(row, col, player) {
  playerTwoBackground.style.display = "none";
  return (
    checkDirection(row, col, player, 0, 1) +
      checkDirection(row, col, player, 0, -1) >
      2 ||
    checkDirection(row, col, player, 1, 0) > 2 ||
    checkDirection(row, col, player, 1, 1) +
      checkDirection(row, col, player, -1, -1) >
      2 ||
    checkDirection(row, col, player, 1, -1) +
      checkDirection(row, col, player, -1, 1) >
      2
  );
}

function checkDirection(row, col, player, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;

  while (
    r >= 0 &&
    r < rows &&
    c >= 0 &&
    c < cols &&
    boardState[r][c] === player
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

function resetBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      boardState[row][col] = null;
    }
  }

  const tokens = document.querySelectorAll(".token");
  tokens.forEach((token) => token.remove());

  currentPlayer = "red";

  playerTurn.style.display = "block";
  timerSection.style.display = "block";
  updatePlayerTurnText();

  winnerContainer.style.display = "none";

  startTurnTimer();
}

function resetBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      boardState[row][col] = null;
    }
  }

  const tokens = document.querySelectorAll(".token");
  tokens.forEach((token) => token.remove());

  currentPlayer = "red";

  playerTurn.style.display = "block";
  timerSection.style.display = "block";
  updatePlayerTurnText();

  winnerContainer.style.display = "none";

  bottomBg.style.display = "none";
  footerBg.style.display = "none";
  customBg.style.display = "none";

  startTurnTimer();
}

function makeCpuMove() {
  const availableCols = [];

  for (let col = 0; col < cols; col++) {
    if (boardState[0][col] === null) {
      availableCols.push(col);
    }
  }

  if (availableCols.length === 0) return;

  const randomCol =
    availableCols[Math.floor(Math.random() * availableCols.length)];

  for (let row = rows - 1; row >= 0; row--) {
    if (!boardState[row][randomCol]) {
      boardState[row][randomCol] = currentPlayer;

      const token = document.createElement("img");
      token.src = `assets/images/counter-${currentPlayer}-small.svg`;
      token.classList.add("token");

      const xOffset = (boardSection.clientWidth - cols * cellSize) / 2;
      const yOffset = (boardSection.clientHeight - rows * cellSize) / 2;

      token.style.left = `${randomCol * cellSize + xOffset}px`;
      token.style.top = `${row * cellSize + yOffset}px`;

      const topLayer = document.getElementById("board-image");
      boardSection.insertBefore(token, topLayer);

      if (checkWinner(row, randomCol, currentPlayer)) {
        clearInterval(timerInterval);

        if (currentPlayer === "red") {
          redWins++;
          playerScoreOne.textContent = "0";
        } else {
          yellowWins++;
          playerScoreTwo.textContent = "0";
        }

        setTimeout(() => {
          playerTurn.style.display = "none";
          playerOneBackground.style.display = "none";
          playerTwoBackground.style.display = "none";
          timerSection.style.display = "none";

          winPlayer.textContent = currentPlayer === "red" ? "PLAYER 1" : "CPU";
          winnerContainer.style.display = "flex";
        }, 100);
        return;
      }

      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      startTurnTimer();
      updatePlayerTurnText();

      break;
    }
  }
}

const largeCellSize = 96;
let gameMode = "cpu";
let cpuPlayer = "yellow";

const largeBoardState = Array.from({ length: rows }, () =>
  Array(cols).fill(null)
);
const largeBoards = document.getElementById("large-boards");

largeBoards.addEventListener("click", (e) => {
  const rect = largeBoards.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickedCol = Math.floor(clickX / largeCellSize);

  if (clickedCol < 0 || clickedCol >= cols) return;

  for (let row = rows - 1; row >= 0; row--) {
    if (!largeBoardState[row][clickedCol]) {
      largeBoardState[row][clickedCol] = currentPlayer;

      const token = document.createElement("img");
      token.src =
        currentPlayer === "red"
          ? "assets/images/counter-red-large.svg"
          : "assets/images/counter-yellow-large.svg";
      token.classList.add("token-large");
      token.style.position = "absolute";
      token.style.left = `${clickedCol * largeCellSize}px`;
      token.style.top = `${row * largeCellSize}px`;

      const topLayer = document.getElementById("board-image-large");
      largeBoards.insertBefore(token, topLayer);

      if (checkLargeWinner(row, clickedCol, currentPlayer)) {
        clearInterval(timerInterval);

        if (currentPlayer === "red") {
          redWins++;
          playerScoreOne.textContent = redWins;
        } else {
          yellowWins++;
          playerScoreTwo.textContent = yellowWins;
        }

        setTimeout(() => {
          playerTurn.style.display = "none";
          playerOneBackground.style.display = "none";
          playerTwoBackground.style.display = "none";
          timerSection.style.display = "none";

          winPlayer.textContent =
            currentPlayer === "red" ? "PLAYER 1" : "PLAYER 2";
          winnerContainer.style.display = "flex";
        }, 100);
        return;
      }

      if (checkLargeWinner(row, clickedCol, currentPlayer)) {
        clearInterval(timerInterval);

        setTimeout(() => {
          playerTurn.style.display = "none";
          playerOneBackground.style.display = "none";
          playerTwoBackground.style.display = "none";
          timerSection.style.display = "none";

          winPlayer.textContent =
            currentPlayer === "red" ? "PLAYER 1" : "PLAYER 2";
          winnerContainer.style.display = "flex";
        }, 100);
        return;
      }

      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      updatePlayerTurnText();
      startTurnTimer();
      if (gameMode === "cpu" && currentPlayer === cpuPlayer) {
        setTimeout(makeCpuMoveLarge, 500);
      }

      break;
    }
  }
});

function checkLargeWinner(row, col, player) {
  return (
    checkLargeDirection(row, col, player, 0, 1) +
      checkLargeDirection(row, col, player, 0, -1) >
      2 ||
    checkLargeDirection(row, col, player, 1, 0) > 2 ||
    checkLargeDirection(row, col, player, 1, 1) +
      checkLargeDirection(row, col, player, -1, -1) >
      2 ||
    checkLargeDirection(row, col, player, 1, -1) +
      checkLargeDirection(row, col, player, -1, 1) >
      2
  );
}

function checkLargeDirection(row, col, player, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;

  while (
    r >= 0 &&
    r < rows &&
    c >= 0 &&
    c < cols &&
    largeBoardState[r][c] === player
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

function resetLargeBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      largeBoardState[row][col] = null;
    }
  }

  const largeTokens = largeBoards.querySelectorAll(".token-large");
  largeTokens.forEach((token) => token.remove());

  winnerContainer.style.display = "none";
  playerTurn.style.display = "flex";
  timerSection.style.display = "flex";
  currentPlayer = "red";
  updatePlayerTurnText();
  startTurnTimer();
}

function makeCpuMoveLarge() {
  const availableCols = [];

  for (let col = 0; col < cols; col++) {
    if (largeBoardState[0][col] === null) {
      availableCols.push(col);
    }
  }

  if (availableCols.length === 0) return;

  const randomCol =
    availableCols[Math.floor(Math.random() * availableCols.length)];

  for (let row = rows - 1; row >= 0; row--) {
    if (!largeBoardState[row][randomCol]) {
      largeBoardState[row][randomCol] = currentPlayer;

      const token = document.createElement("img");
      token.src = `assets/images/counter-${currentPlayer}-large.svg`;
      token.classList.add("token-large");

      token.style.position = "absolute";
      token.style.left = `${randomCol * largeCellSize}px`;
      token.style.top = `${row * largeCellSize}px`;

      const topLayer = document.getElementById("board-image-large");
      largeBoards.insertBefore(token, topLayer);

      if (checkLargeWinner(row, randomCol, currentPlayer)) {
        clearInterval(timerInterval);

        if (currentPlayer === "red") {
          redWins++;
          playerScoreOne.textContent = redWins;
        } else {
          yellowWins++;
          playerScoreTwo.textContent = yellowWins;
        }

        setTimeout(() => {
          playerTurn.style.display = "none";
          playerOneBackground.style.display = "none";
          playerTwoBackground.style.display = "none";
          timerSection.style.display = "none";

          winPlayer.textContent = currentPlayer === "red" ? "PLAYER 1" : "CPU";
          winnerContainer.style.display = "flex";
        }, 100);
        return;
      }

      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      startTurnTimer();
      updatePlayerTurnText();
      break;
    }
  }
}
