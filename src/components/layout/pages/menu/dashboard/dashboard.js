import './dashboard.css'
import texts from "./dashboard_texts.json"

export const printDashboard = (playerData) => {
  const dashboard = templateDashboard(playerData);
  return dashboard;
};

function templateDashboard(playerData) {
  const playerName = playerData.name;

  const dashboard = document.createElement("section");
  dashboard.id = "dashboard";
  dashboard.classList.add("section", "hidden");
  
  const dashboard_textContainer = document.createElement("div");
  dashboard_textContainer.classList.add("dashboard__textContainer", "flex-container");
  const dashboard_resultsContainer = document.createElement("div");
  dashboard_resultsContainer.classList.add("dashboard__resultsContainer", "flex-container");

  const title = document.createElement("h1");
  const span = document.createElement("span");
  span.classList.add("dashboard__textContainer-span")
  span.textContent = playerName

  if(playerData.totalGames === 0){
    title.append(texts.dashboard.initTitle, span, "!");
  } else {
    title.append(texts.dashboard.title, span, "!");
  }

  const subtitle = document.createElement("p");
  subtitle.textContent = texts.dashboard.subtitle

  dashboard_textContainer.append(title, subtitle)

  const results = texts.dashboard.resultsBoard;
  results.forEach(result => {
    const div = document.createElement("div");
    div.classList.add("dashboard__resultsContainer-div", "dashboard__resultsContainer-div" + "-" + result.description.replace(/\s+/g, "-"), "flex-container");
    
    const resultTextDiv = document.createElement("div");
    const resultDescription = document.createElement("h2");
    const resultValueDiv = document.createElement("div");

    if(result.icon){
      const resultIcon = document.createElement("img");
      resultIcon.src = import.meta.env.BASE_URL + result.icon;
      div.append(resultIcon);
    }
    resultDescription.textContent = result.description;

    const totalGames = playerData.totalGames || 0;
    const totalScore = playerData.totalScore || 0;
    const recentGames = playerData.recentGames || [];
    
    if(result.description === "Games Played" && totalGames){
      resultValueDiv.textContent = totalGames
    } else if (result.description === "Games Played"){
    resultValueDiv.textContent = "0"
   };

    if(result.description === "Total Score" && totalScore){
      resultValueDiv.textContent = totalScore
    } else if (result.description === "Total Score"){
    resultValueDiv.textContent = "0"
   };

    if(result.description === "Recent Games" && recentGames.length > 0){
      recentGames.slice(0, 10).forEach(recentGame => {
        const recentGameContainer = document.createElement("div");
        recentGameContainer.classList.add("recentGameContainer");
        const recentGameContentDiv = document.createElement("div");
        recentGameContentDiv.classList.add("recentGameContentDiv");
        const recentGameIconDiv = document.createElement("div");
        recentGameIconDiv.classList.add("recentGameIconDiv");
        const recentGameIcon = document.createElement("img");
        recentGameIcon.src = import.meta.env.BASE_URL + (recentGame.icon || "icons/dashboard/controller.webp");
        recentGameIcon.alt = recentGame.name + " icon";
        const recentGameTextDiv = document.createElement("div");
        recentGameTextDiv.classList.add("recentGameTextDiv");
        const recentGameName = document.createElement("h4");
        recentGameName.textContent = recentGame.name;
        const recentGameDate = document.createElement("p");
        recentGameDate.textContent = recentGame.date;

        const recentGameScoreDiv = document.createElement("div");
        recentGameScoreDiv.classList.add("recentGameScoreDiv");
        const recentGameScore = document.createElement("span");
        recentGameScore.textContent = recentGame.score + " pts";

        resultValueDiv.append(recentGameContainer);
        recentGameContainer.append(recentGameContentDiv, recentGameScoreDiv);
        recentGameContentDiv.append(recentGameIconDiv, recentGameTextDiv)
        recentGameIconDiv.append(recentGameIcon)
        recentGameTextDiv.append(recentGameName, recentGameDate)
        recentGameScoreDiv.append(recentGameScore)
      });
      resultValueDiv.classList.remove("nothingToShow")
      resultValueDiv.classList.add("recentGamesResultsContainer")
    } else if (result.description === "Recent Games"){
      resultValueDiv.textContent = "There's nothing to show here yet...";
      resultValueDiv.classList.add("nothingToShow")
      resultValueDiv.classList.remove("recentGamesResultsContainer")
   };

    div.append(resultTextDiv)
    resultTextDiv.append(resultDescription, resultValueDiv);
    dashboard_resultsContainer.append(div);
  });

  dashboard.append(dashboard_textContainer, dashboard_resultsContainer);

  return dashboard
}