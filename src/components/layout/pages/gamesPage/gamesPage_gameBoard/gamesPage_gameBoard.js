import "./gamesPage_gameBoard.css";  

//! GAME BOARD CONTAINER
export function createGameBoardContainer(selectedGame, gameModules){
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("gameBoardContainer");

  const gameModule = gameModules[selectedGame];
  const gameBoard = gameModule.templateGame();

  gameBoardContainer.append(gameBoard);
  gameModule.initGame(gameBoard);
  
  return gameBoardContainer
}
