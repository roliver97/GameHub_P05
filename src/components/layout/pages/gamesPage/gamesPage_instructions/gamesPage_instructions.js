import "./gamesPage_instructions.css";  

// INSTRUCTIONS CONTAINER
export function createInstructionsContainer(gameStructure) {
  const gameInstructionsContainer = document.createElement("div");
  gameInstructionsContainer.classList.add("gameInstructionsContainer");

  const gameInstructionsTitle = document.createElement("h4");
  gameInstructionsTitle.textContent = "How to Play";
  const gameInstructionsList = document.createElement("ul");
  
  Object.keys(gameStructure.howToPlay.instructions).forEach(key => {
    const gameInstructionsListItem = document.createElement("li");
    gameInstructionsListItem.textContent = gameStructure.howToPlay.instructions[key];
    gameInstructionsList.append(gameInstructionsListItem)
  });
  
  gameInstructionsContainer.append(gameInstructionsTitle, gameInstructionsList)

  return gameInstructionsContainer;
}
