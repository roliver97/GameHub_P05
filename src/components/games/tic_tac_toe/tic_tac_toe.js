import "./tic_tac_toe.css";
import { updateTempData } from "../../data/tempData/tempData.js";
import { updateUI } from "../../data/ui/ui.js";
import { updatePlayerData } from "../../data/playerData/playerData.js";

export const templateGame = () => {
  const board = document.createElement("div");
  board.classList.add("ticTacToeBoard");
  
  return board;
}

let currentPlayer = "X";
let gameActive = true;
const state = Array(9).fill(null); //Creamos un array con 9 espacios vacíos y los llenamos con "null".

export function initGame(gameBoard) {
  state.fill(null);
  currentPlayer = "X";
  gameActive = true;

    for (let i = 0; i < 9; i++) {
    const button = document.createElement("button");
    button.classList.add("ticTacToeCell");
    button.dataset.index = i;
    gameBoard.append(button);
  }

  const cells = gameBoard.querySelectorAll(".ticTacToeCell");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!gameActive || state[index]) return; // state[index] para comprobar si la cell a la que hacemos click está ocupada y evitar así sobreescribir

      state[index] = currentPlayer;
      cell.textContent = currentPlayer; //primero marcamos el jugador actual
      const currentPlayerLabel = document.querySelector(".gameCurrentPlayerLabel");
      const currentPlayerValue = document.querySelector(".gameCurrentPlayerValue");

      updateTempData("tic-tac-toe", {currentPlayer: currentPlayer});

      if (checkWinner(state)) {
        currentPlayerLabel.textContent = `🎉 The winner is:`;
        currentPlayerLabel.classList.add("winnerLabel")
        gameActive = false;
        updateTempData("tic-tac-toe", { winner: currentPlayer });
        updateUI("tic-tac-toe");
        updatePlayerData("tic-tac-toe", {result:"win"})
        } else if (!state.includes(null)) {
          currentPlayerLabel.textContent = `🤝 It's a draw!`;
          currentPlayerLabel.classList.add("drawLabel")
          gameActive = false;
          updateTempData("tic-tac-toe", { winner: "draw", currentPlayer: ""});
          updateUI("tic-tac-toe");
          updatePlayerData("tic-tac-toe", {result:"draw"})
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTempData("tic-tac-toe", { currentPlayer });
            updateUI("tic-tac-toe");
          }
    })
  });
}

function checkWinner(state) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a]; // retorna "X" o "O"
    }
  }

  return null;
}
