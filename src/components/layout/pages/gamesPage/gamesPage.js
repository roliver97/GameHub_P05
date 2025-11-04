import "./gamesPage.css";
import texts from "./gamesPage_texts.json"
import { createTempData } from "../../../data/tempData/tempData.js";
import * as TicTacToe from "../../../games/tic_tac_toe/tic_tac_toe.js";
import * as RockPaperScissors from "../../../games/rock_paper_scissors/rock_paper_scissors.js";
import * as MemoryCards from "../../../games/memory_cards/memory_cards.js";
import { createTitleContainer } from "./gamesPage_title/gamesPage_title.js";
import { createSummaryContainer } from "./gamesPage_summary/gamesPage_summary.js";
import { createCurrentPlayerContainer } from "./gamesPage_currentPlayer/gamesPage_currentPlayer.js";
import { createActionPromptContainer } from "./gamesPage_actionPrompt/gamesPage_actionPrompt.js";
import { createGameBoardContainer } from "./gamesPage_gameBoard/gamesPage_gameBoard.js";
import { createGameOptionsContainer } from "./gamesPage_gameOptions/gamesPage_gameOptions.js";
import { createInstructionsContainer } from "./gamesPage_instructions/gamesPage_instructions.js";


const gameModules = {
"tic-tac-toe": TicTacToe,
"rock-paper-scissors": RockPaperScissors,
"memory-cards": MemoryCards
};


export const printGamesPage = () => {
  const section = document.createElement("section");
  section.id = "gamesPage";
  section.classList.add("section", "hidden");
  
  return section;
};


export const printGames = (selectedGame) => {
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("gameContainer");
  const gameStructure = texts[selectedGame];
  const tempData = createTempData(selectedGame);

  if (!selectedGame) {
    gameContainer.textContent = "No game selected.";
    return gameContainer;
  }

  if (gameStructure.titleContainer)
    gameContainer.append(createTitleContainer(gameStructure));

  if (gameStructure.gameSummary)
    gameContainer.append(createSummaryContainer(selectedGame, gameStructure, tempData));

  if (gameStructure.currentPlayer)
    gameContainer.append(createCurrentPlayerContainer(selectedGame, tempData));

  if (gameStructure.actionPrompt)
    gameContainer.append(
      createActionPromptContainer(selectedGame, tempData)
    );
    
  if (gameStructure.game)
  gameContainer.append(createGameBoardContainer(selectedGame, gameModules));

  if (gameStructure.gameOptions)
    gameContainer.append(createGameOptionsContainer(selectedGame, gameStructure, gameModules));

  if (gameStructure.howToPlay)
    gameContainer.append(createInstructionsContainer(gameStructure));

  return gameContainer;
};













