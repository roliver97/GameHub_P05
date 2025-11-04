  //* Creamos variable para almacenar tempData porque si no hubiese datos, al crear un objeto vacio, evitamos que el codigo pete. 
  //? Con playerData no creamos variable, pero deberemos poner un interrogante (playerData[selectedGame]?...) para asegurarnos de que el codigo seguirá funcionando aunque no haya datos 
  // En ambos casos, si no hay datos, lo interpretarà como undefined
  import { printDashboard } from "../../layout/pages/menu/dashboard/dashboard";
  import { printLeaderboard } from "../../layout/pages/menu/leaderboard/leaderboard";
  import { printProfile } from "../../layout/pages/menu/profile/profile";

export function updateUI(selectedGame) {
//TEMP DATA (Session Storage) || PLAYER DATA (Local Storage)
  const playerData = JSON.parse(localStorage.getItem("playerData")) || {};
  const tempData = JSON.parse(sessionStorage.getItem("tempData")) || {};
  const gameData = tempData[selectedGame] || {};
  
  // GAMES
  updateGamesUI(selectedGame, gameData, playerData)
  // MENU
  updateMenuUI(playerData);
}

function updateGamesUI(selectedGame, gameData, playerData) {
  // for TIC-TAC-TOE or ROCK PAPER SCISSORS
  const currentPlayerValue = document.querySelector(".gameCurrentPlayerContainer .currentPlayerValue");
  const xWinsValue = document.querySelector(".resultValue_x-wins");
  const oWinsValue = document.querySelector(".resultValue_o-wins");
  const drawsValue = document.querySelector(".resultValue_draws");

    if(selectedGame === "tic-tac-toe" || selectedGame === "rock-paper-scissors") {
      if (xWinsValue) xWinsValue.textContent = (gameData.x_wins ?? 0).toString();
      if (oWinsValue) oWinsValue.textContent = (gameData.o_wins ?? 0).toString();
      if (drawsValue) drawsValue.textContent = (gameData.draws ?? 0).toString();

      if (currentPlayerValue) {
        currentPlayerValue.textContent = gameData.currentPlayer ?? "X";
        currentPlayerValue.classList.remove("currentPlayerValue_x", "currentPlayerValue_o");
        if (gameData.currentPlayer === "X") currentPlayerValue.classList.add("currentPlayerValue_x");
        else if (gameData.currentPlayer === "O") currentPlayerValue.classList.add("currentPlayerValue_o");
      }

      const storedCurrentStreak = playerData.currentStreaks?.[selectedGame];
      const storedBestStreak = playerData.bestStreaks?.[selectedGame];
      const currentStreakValue = document.querySelector(".resultValue_currentStreak");
      const bestStreakValue = document.querySelector(".resultValue_bestStreak");

      if (bestStreakValue) bestStreakValue.textContent = storedBestStreak ?? "--";
      if (currentStreakValue) currentStreakValue.textContent = storedCurrentStreak ?? "--";
    }

  // for MEMORY CARDS
  const movesValue = document.querySelector(".resultValue_moves");
  const matchesValue = document.querySelector(".resultValue_matches");
  const timeValue = document.querySelector(".resultValue_time");

    if(selectedGame === "memory-cards") {
      movesValue.textContent = (gameData.moves ?? 0).toString();
      matchesValue.textContent = (gameData.matches ?? 0).toString();
      timeValue.textContent = gameData.time ?? "00:00";

      const storedBestTime = playerData.bestTimes?.["memory-cards"];
      const bestTimeValue = document.querySelector(".resultValue_bestTime");

      bestTimeValue.textContent = storedBestTime ?? "--";
    }
}

function updateMenuUI(playerData) {
  const dashboard = document.querySelector("#dashboard");
  dashboard.replaceWith(printDashboard(playerData));
  const leaderboard = document.querySelector("#leaderboard");
  leaderboard.replaceWith(printLeaderboard(playerData));
  const profile = document.querySelector("#profile");
  profile.replaceWith(printProfile(playerData));
}