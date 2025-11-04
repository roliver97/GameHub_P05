export function createTempData(gameName) {
  const defaultData = {
    currentSection: "",
    currentGame:"",
    
    "tic-tac-toe": {
      currentPlayer: "X",
      x_wins: 0,
      o_wins: 0,
      draws: 0
    },
    "rock-paper-scissors": {
      userChoice: "",
      compChoice: "",
      x_wins: 0,
      o_wins: 0,
      draws: 0,
    },
    "memory-cards": {
      moves: 0,
      matches: 0,
      time: "00:00",
    }
  };

  const tempData = JSON.parse(sessionStorage.getItem("tempData")) || {};

  if (gameName) {
    tempData[gameName] = defaultData[gameName];
  } else {
    Object.assign(tempData, defaultData);
  }

  sessionStorage.setItem("tempData", JSON.stringify(tempData));
  return tempData
}

export function updateTempData(gameName, updates = {}) {
  const tempData = JSON.parse(sessionStorage.getItem("tempData")) || createTempData();
  const gameTemp = tempData[gameName] || {};

  switch (gameName) {
    case "tic-tac-toe":
      if (updates.currentPlayer !== undefined) {
        gameTemp.currentPlayer = updates.currentPlayer;
      }

      if (updates.winner === "X") {
        gameTemp.x_wins = (gameTemp.x_wins || 0) + 1;
      } else if (updates.winner === "O") {
        gameTemp.o_wins = (gameTemp.o_wins || 0) + 1;
      } else if (updates.winner === "draw") {
        gameTemp.draws = (gameTemp.draws || 0) + 1;
      }
      break;

    case "rock-paper-scissors":
      if (updates.userChoice !== undefined) {
        gameTemp.userChoice = updates.userChoice;
      }
      if (updates.compChoice !== undefined) {
        gameTemp.compChoice = updates.compChoice;
      }
      if (updates.winner === "user") {
        gameTemp.x_wins = (gameTemp.x_wins || 0) + 1;
      } else if (updates.winner === "comp") {
        gameTemp.o_wins = (gameTemp.o_wins || 0) + 1;
      } else if (updates.winner === "draw") {
        gameTemp.draws = (gameTemp.draws || 0) + 1;
      }
      break;

    case "memory-cards":
      if (updates.moves !== undefined) {
        gameTemp.moves = (gameTemp.moves || 0) + updates.moves;
      }
      if (updates.matches !== undefined) {
        gameTemp.matches = (gameTemp.matches || 0) + updates.matches;
      }
      if (updates.time !== undefined) {
        gameTemp.time = updates.time;
      }
      break;

    default:
      console.warn(`No update logic defined for game: ${gameName}`);
      break;
  }

  tempData[gameName] = gameTemp;
  sessionStorage.setItem("tempData", JSON.stringify(tempData));

}

//RESET
export function resetTempData(gameName) {
  const tempData = JSON.parse(sessionStorage.getItem("tempData")) || {};
  if (tempData[gameName]) {
    createTempData();
    updateUI(gameName);
  }
}