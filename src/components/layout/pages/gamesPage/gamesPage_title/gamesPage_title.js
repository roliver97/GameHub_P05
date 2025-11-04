import "./gamesPage_title.css";

//TITLE CONTAINER
export function createTitleContainer(gameStructure){
  const gameTitleContainer = document.createElement("div");
  gameTitleContainer.classList.add("gameTitleContainer");
  const gameTitleDiv = document.createElement("div");
  gameTitleDiv.classList.add("gameTitleDiv");
  const gameTitleIcon =document.createElement("img");
  const gameTitle = document.createElement("h1");
  const gameSubtitle = document.createElement("p");
  
  gameTitleIcon.src = import.meta.env.BASE_URL + gameStructure.titleContainer.gameIcon;
  gameTitle.textContent = gameStructure.titleContainer.gameTitle;
  gameSubtitle.textContent = gameStructure.titleContainer.gameSubtitle;

  gameTitleDiv.append(gameTitleIcon, gameTitle);
  gameTitleContainer.append(gameTitleDiv, gameSubtitle);
  
  return gameTitleContainer;
}