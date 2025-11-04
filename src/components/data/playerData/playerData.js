import { isBetterTime } from "../../common/time_utils.js";
import { updateUI } from "../ui/ui.js";

export function createPlayerProfile(playerName) {
  const isoDate = new Date().toISOString();
  const [year, month, day] = isoDate.split("T")[0].split("-");
  const localDate = `${day}/${month}/${year}`;

  const playerData = {
    name: playerName,
    totalGames: 0,
    totalScore: 0,
    scores: {
      victories: {
        "tic-tac-toe": 0,
        "memory-cards": 0,
        "rock-paper-scissors": 0
      },
      draws: {
        "tic-tac-toe": 0,
        "memory-cards": 0,
        "rock-paper-scissors": 0
      }
    },
    bestTimes: {
      "memory-cards": null,
      "tic-tac-toe": null,
      "rock-paper-scissors": null
    },
    currentStreaks: {
      "tic-tac-toe": 0,
      "memory-cards": 0,
      "rock-paper-scissors": 0
    },
    bestStreaks: {
      "memory-cards": 0,
      "tic-tac-toe": 0,
      "rock-paper-scissors": 0
    },
    recentGames: [],
    initDate: localDate,
    favoriteGame: undefined,
    averageScore: 0
  };
  localStorage.setItem("playerData", JSON.stringify(playerData));
}


export function updatePlayerData(gameName, updates) {
  const playerData = JSON.parse(localStorage.getItem("playerData")) || {};
  if (!playerData) return;

  const nameMap = {
  "tic-tac-toe": "Tic Tac Toe",
  "memory-cards": "Memory Cards",
  "rock-paper-scissors": "Rock Paper Scissors"
  };

  const iconMap = {
  "tic-tac-toe": "icons/tic_tac_toe/tic_tac_toe.svg",
  "memory-cards": "icons/memory/memory.png",
  "rock-paper-scissors": "icons/rock_paper_scissors/rock_paper_scissors.png"
  };

  playerData.totalGames = (playerData.totalGames || 0) + 1;
  
  if (updates.result === "win") {
    playerData.scores.victories[gameName] = (playerData.scores.victories[gameName] || 0) + 1;
    playerData.totalScore = (playerData.totalScore || 0) + 100;
  } else if (updates.result === "draw") {
    playerData.scores.draws[gameName] = (playerData.scores.draws[gameName] || 0) + 1;
    playerData.totalScore = (playerData.totalScore || 0) + 50;
  } else if (updates.result === "lose") {
    playerData.totalScore = playerData.totalScore || 0;
  }

  const isoDate = new Date().toISOString();
  const [year, month, day] = isoDate.split("T")[0].split("-");
  const localDate = `${day}/${month}/${year}`;

  const newGamePlayed = {
    name: nameMap[gameName] || gameName,
    score: updates.result === "win" ? 100 : updates.result === "draw" ? 50 : 0,
    result: updates.result,
    date: localDate,
    icon: iconMap[gameName]
  };

  // "|| []" Crea el array como medida de seguridad contra la pérdida de datos en localStorage
  playerData.recentGames = playerData.recentGames || []; 
  // Inyectamos primero la partida más reciente
  playerData.recentGames.unshift(newGamePlayed);
  if (playerData.recentGames.length > 5) {
    playerData.recentGames.pop();
  }

    if (gameName === "rock-paper-scissors") {
    if (updates.result === "win") {
      playerData.currentStreaks[gameName] = (playerData.currentStreaks[gameName] || 0) + 1;
    } else {
      playerData.currentStreaks[gameName] = 0;
    }

    const currentStreak = playerData.currentStreaks[gameName];
    const bestStreak = playerData.bestStreaks[gameName] || 0;
    if (currentStreak > bestStreak) {
      playerData.bestStreaks[gameName] = currentStreak;
    }
  }

  if (gameName === "memory-cards" && updates.time) {
    const currentBest = playerData.bestTimes["memory-cards"];
    if (!currentBest || isBetterTime(updates.time, currentBest)) {
      playerData.bestTimes["memory-cards"] = updates.time;
    }
  }

  const recentGames = playerData.recentGames || [];
  if (recentGames.length > 0) {
    const total = recentGames.reduce((sum, game) => sum + game.score, 0);
    playerData.averageScore = Math.round(total / recentGames.length);
  } else {
    playerData.averageScore = undefined;
  }

  const favoriteGameCount = playerData.recentGames.reduce((acc, game) => {
    acc[game.name] = (acc[game.name] || 0) + 1;
    return acc;
  }, {});

  const favoriteGameKey = Object.keys(favoriteGameCount).sort(
    (a, b) => favoriteGameCount[b] - favoriteGameCount[a]
  )[0];

  playerData.favoriteGame = nameMap[favoriteGameKey] || favoriteGameKey;

  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
}



