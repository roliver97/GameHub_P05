import "./gamesPage_currentPlayer.css";

//CURRENT PLAYER CONTAINER
export function createCurrentPlayerContainer(selectedGame, tempData) {
  const gameCurrentPlayerContainer = document.createElement("div");
  gameCurrentPlayerContainer.classList.add("gameCurrentPlayerContainer");
  const gameCurrentPlayerLabel = document.createElement("p");
  gameCurrentPlayerLabel.classList.add("gameCurrentPlayerLabel");
  const gameCurrentPlayerValue = document.createElement("p");
  gameCurrentPlayerValue.classList.add("gameCurrentPlayerValue");

  gameCurrentPlayerLabel.textContent = "Current Player:";
  gameCurrentPlayerValue.classList.add("currentPlayerValue");
  gameCurrentPlayerValue.textContent = tempData[selectedGame]?.currentPlayer ?? "?";

  if(gameCurrentPlayerValue.textContent === "X") {
  gameCurrentPlayerValue.classList.add("currentPlayerValue_x");
  }
  else {gameCurrentPlayerValue.classList.add("currentPlayerValue_o");}

  gameCurrentPlayerContainer.append(gameCurrentPlayerLabel, gameCurrentPlayerValue);

  return gameCurrentPlayerContainer;
}