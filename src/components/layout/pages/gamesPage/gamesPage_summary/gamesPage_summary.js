import "./gamesPage_summary.css";

//SUMMARY CONTAINER
export function createSummaryContainer(selectedGame, gameStructure, tempData) {
  const gameSummaryContainer = document.createElement("div");
  gameSummaryContainer.classList.add("gameSummaryContainer");

  Object.keys(gameStructure.gameSummary).forEach(key => {
    const div = document.createElement("div");
    div.classList.add("gameSummaryDiv", key);
    const value = document.createElement("p");
  
    if (key === "bestTime" || key === "bestStreak") { 
      const playerData = JSON.parse(localStorage.getItem("playerData")) || {};
      if (key === "bestTime") {
        value.textContent = playerData.bestTimes?.[selectedGame] ?? "--";
      } else if (key === "bestStreak") {
        value.textContent = playerData.bestStreaks?.[selectedGame] ?? "0";
      }
    } else {
      value.textContent = tempData[selectedGame]?.[key] ?? "0";
    }

    value.classList.add("resultValue", "resultValue_" + key);
    const label = document.createElement("p");
    label.textContent = gameStructure.gameSummary[key];
    label.classList.add("resultLabel");

    div.append(value, label);
    gameSummaryContainer.append(div);
  });

  return gameSummaryContainer;
}