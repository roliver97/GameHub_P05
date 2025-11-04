import "./gamesPage_actionPrompt.css";

//ACTION PROMPT CONTAINER
export function createActionPromptContainer(selectedGame, tempData) {
  const gameActionPromptContainer = document.createElement("div");
  gameActionPromptContainer.classList.add("gameActionPromptContainer");
  const gameActionPrompt = document.createElement("p");
  gameActionPrompt.classList.add("gameActionPrompt");

  if (selectedGame === "memory-cards") {
    const moves = tempData?.[selectedGame]?.moves ?? 0;
    if (moves === 0) {
      gameActionPrompt.textContent = "Click any card to start the game";
    } else {
      gameActionPrompt.textContent = "Find all 8 matching pairs";
    }
  } else if (selectedGame === "rock-paper-scissors") {
    gameActionPrompt.textContent = "Choose your move!";
  }

  gameActionPromptContainer.append(gameActionPrompt);
  
  return gameActionPromptContainer;
}