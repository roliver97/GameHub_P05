import './leaderboard.css';
import texts from "./leaderboard_texts.json";
import { calculateGameTotals } from '../../../../common/player_stats';

export const printLeaderboard = (playerData) => {
  const leaderboard = templateLeaderboard(playerData);
  return leaderboard;
};

function templateLeaderboard(playerData) {
  const leaderboard = document.createElement("section");
  leaderboard.id = "leaderboard";
  leaderboard.classList.add("section", "hidden");

  const leaderboardTitleContainer = document.createElement("div");
  leaderboardTitleContainer.classList.add("leaderboard__titleContainer", "flex-container");
  const leaderboardTitle = document.createElement("h1");
  const leaderboardIcon = document.createElement("img");
  leaderboardTitle.textContent = texts.leaderboard.title;
  leaderboardIcon.src = import.meta.env.BASE_URL + texts.leaderboard.icon;

  const leaderboard_resultsContainer = document.createElement("div");
  leaderboard_resultsContainer.classList.add("leaderboard__resultsContainer", "flex-container");
  
  leaderboardTitleContainer.append(leaderboardIcon, leaderboardTitle)
  leaderboard.append(leaderboardTitleContainer, leaderboard_resultsContainer)

  const gameTotals = calculateGameTotals(playerData);
  gameTotals.sort((a, b) => b.totalScore - a.totalScore);

  const hasResults = gameTotals.some(game => game.victories > 0 || game.draws > 0);

    if (!hasResults) {
    const noResultsDiv = document.createElement("div");
    noResultsDiv.classList.add("leaderboard__noResults");
    noResultsDiv.textContent = "No scores yet. Start playing games to see the leaderboard!";
    leaderboard_resultsContainer.append(noResultsDiv);
  
  } else {
      const resultsContainer_titleDiv = document.createElement("div");
      resultsContainer_titleDiv.classList.add("leaderboard__resultsContainer-titleDiv");
      const resultsContainer_title = document.createElement("h2");
      resultsContainer_title.textContent = texts.leaderboard.resultsBoard.title;
      
      resultsContainer_titleDiv.append(resultsContainer_title);
      leaderboard_resultsContainer.append(resultsContainer_titleDiv);

      for (let i = 0; i < gameTotals.length; i++) {
        const result = gameTotals[i];

        const resultContainer = document.createElement("div");
        const resultLeftContainer = document.createElement("div");
        const resultPositionDiv = document.createElement("div");
        const resultTextDiv = document.createElement("div");
        const resultRightContainer = document.createElement("div");
        const resultDateDiv = document.createElement("div");

        resultContainer.classList.add("leaderboard__resultsContainer-resultContainer");
        resultLeftContainer.classList.add("leaderboard__resultsContainer-resultLeftContainer");
        resultPositionDiv.classList.add("leaderboard__resultsContainer-resultPositionDiv", "flex-container");
        resultTextDiv.classList.add("leaderboard__resultsContainer-resultTextDiv")
        resultRightContainer.classList.add("leaderboard__resultsContainer-resultRightContainer");
        resultDateDiv.classList.add("leaderboard__resultsContainer-resultDateDiv");

        const resultGame = document.createElement("h4");
        const resultPlayer = document.createElement("p");
        const resultPosition = document.createElement("p");
        const resultScore = document.createElement("span");
        const resultDate = document.createElement("p");
        const resultDateSubtitle = document.createElement("p");

        resultPlayer.textContent = playerData.name;
        resultPosition.textContent = i + 1;
        resultGame.textContent = result.name;
        resultScore.textContent = result.totalScore;

        const recentGameForThisGame = playerData.recentGames.find(g => g.name === result.name);
        const resultDateText = recentGameForThisGame ? recentGameForThisGame.date : "--";
        resultDate.textContent = resultDateText;
        resultDateSubtitle.textContent = "Last game";

        // Clases especiales por podio
        if (i === 0) resultPositionDiv.classList.add("gold");
        else if (i === 1) resultPositionDiv.classList.add("silver");
        else if (i === 2) resultPositionDiv.classList.add("bronze");

        resultContainer.append(resultLeftContainer, resultRightContainer);
        resultPositionDiv.append(resultPosition);
        resultLeftContainer.append(resultPositionDiv, resultTextDiv)
        resultTextDiv.append(resultGame, resultPlayer);
        resultDateDiv.append(resultDateSubtitle, resultDate);
        resultRightContainer.append(resultScore, resultDateDiv);
        
        leaderboard_resultsContainer.append(resultContainer);
      }
  }

  return leaderboard;
}