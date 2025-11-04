
import { printGames } from "../../pages/gamesPage/gamesPage";
import { showSection } from "../../../common/layout_utils";


export function templateHeaderGames(headerTexts) {
  const header_gamesDiv = document.createElement("div");
  header_gamesDiv.classList.add("header__contentContainer-gamesDiv", "flex-container");

  const gamesTitle = document.createElement("h2");
  gamesTitle.textContent = headerTexts.gamesDiv.title;

  const games = headerTexts.gamesDiv.games;
  const gameList = document.createElement("ul");

  games.forEach(game => {
    const gameListItem = document.createElement("li");
    const gameButton = document.createElement("button");
    gameButton.classList.add("header__contentContainer-button")
    const gameIcon = document.createElement("img");
    const gameName = document.createElement("p");

    gameIcon.src = import.meta.env.BASE_URL + game.icon;
    gameIcon.alt = `${game.name} icon`;

    gameName.textContent = game.name;

    // EVENT LISTENERS
    gameButton.dataset.section = game.name.toLowerCase().replace(/\s/g, "-");
    gameButton.addEventListener("click", () => {
      const allButtons = document.querySelectorAll('.header__contentContainer-button');
      allButtons.forEach(btn => btn.classList.remove('active'));
      gameButton.classList.add("active");

      const container = document.querySelector("#gamesPage");
      container.innerHTML = "";
      container.append(printGames(gameButton.dataset.section));

      const tempData = JSON.parse(sessionStorage.getItem("tempData")) || {};
      tempData.currentSection = "gamesPage";
      tempData.currentGame = gameButton.dataset.section;
      sessionStorage.setItem("tempData", JSON.stringify(tempData));

      showSection("gamesPage")
    });

    gameList.append(gameListItem);
    gameListItem.append(gameButton);
    gameButton.append(gameIcon, gameName);
  });

  header_gamesDiv.append(gamesTitle, gameList);
  return header_gamesDiv;
}