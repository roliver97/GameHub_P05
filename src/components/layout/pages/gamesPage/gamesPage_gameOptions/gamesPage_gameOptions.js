import "./gamesPage_gameOptions.css";  
import { printGames } from "../gamesPage";
import { resetTempData } from "../../../../data/tempData/tempData";

// GAME OPTIONS CONTAINER
export function createGameOptionsContainer(selectedGame, gameStructure, gameModules) {
const gameOptionsContainer = document.createElement("div");
  gameOptionsContainer.classList.add("gameOptionsContainer");

  Object.keys(gameStructure.gameOptions).forEach(key => {
    const button = document.createElement("button");
    button.classList.add("optionButton", key);
    button.textContent = gameStructure.gameOptions[key];
    gameOptionsContainer.append(button);
  
    if (selectedGame === "tic-tac-toe") {
      button.addEventListener("click", () => {
        const gameBoard = document.querySelector(".ticTacToeBoard");

        if (key === "newGame") {
          const newBoard = gameModules[selectedGame].templateGame();
          gameBoard.replaceWith(newBoard);
          gameModules[selectedGame].initGame(newBoard);

          const currentPlayerLabel = document.querySelector(".gameCurrentPlayerLabel");
          const currentPlayerValue = document.querySelector(".gameCurrentPlayerValue");

          currentPlayerLabel.textContent = "Current Player:";
          currentPlayerLabel.classList.remove("drawLabel", "winnerLabel")
          currentPlayerValue.textContent = "X";
          currentPlayerValue.classList.remove("currentPlayerValue_o");
          currentPlayerValue.classList.add("currentPlayerValue_x");

        } else if (key === "resetStats") {
          const gameContainer = document.querySelector(".gameContainer");
          const newGameContainer = printGames(selectedGame);
          gameContainer.replaceWith(newGameContainer);
          resetTempData(selectedGame);
        }
      });
    }else if (selectedGame === "rock-paper-scissors") {
      button.addEventListener("click", () => {
        const gameBoard = document.querySelector(".rockPaperScissorsBoard");

        if (key === "newGame") {
          const newBoard = gameModules[selectedGame].templateGame();
          gameBoard.replaceWith(newBoard);
          gameModules[selectedGame].initGame(newBoard);
        }
      });
    } else if (selectedGame === "memory-cards") {
      button.addEventListener("click", () => {
        if (key === "newGame") {          
          const gameContainer = document.querySelector(".gameContainer");
          const newGameContainer = printGames(selectedGame);
          gameContainer.replaceWith(newGameContainer);
          resetTempData(selectedGame);   
        }
      });
    }
  });
  return gameOptionsContainer;
}