import './header.css'
import texts from "./header_texts.json"
import { templateHeaderGames } from './header_games/header_games';
import { templateHeaderMenu } from './header_menu/header_menu';
import { templateHeaderMobile } from './header_mobile/header_mobile';

export const printHeader = (playerData) => {
  const header = templateHeader(playerData);
  document.body.appendChild(header);
};

function templateHeader(playerData) {
  const header = document.createElement("header");
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("headerContainer", "flex-container", "hidden");
  const headerMobileOverlay = document.createElement("div");
  headerMobileOverlay.classList.add("headerMobileOverlay", "hidden");

  const playerName = playerData.name;
  const headerTexts = texts
  
  const header_logoContainer = document.createElement("div");
  header_logoContainer.classList.add("header__logoContainer", "flex-container");
  const header_contentContainer = document.createElement("div");
  header_contentContainer.classList.add("header__contentContainer", "flex-container");
  const header_footer = document.createElement("div");
  header_footer.classList.add("header__footer", "flex-container");

  const footerText = document.createElement("p");
  footerText.textContent = "GamesHub | Rock The Code | P5"
  header_footer.append(footerText);

  header.append(headerContainer, headerMobileOverlay)
  headerContainer.append(header_logoContainer, header_contentContainer)
  
  /* Logo Container */
  const logoIcon = document.createElement("img");
  logoIcon.src = import.meta.env.BASE_URL + "icons/logo.svg";

  const logoTitle = document.createElement("h1");
  logoTitle.textContent = texts.logoContainer.title;

  const logoContainerText = document.createElement("p");
  const logoContainerSpan = document.createElement("span");
  logoContainerText.textContent = texts.logoContainer.text;
  logoContainerText.classList.add("header__logoContainer-text")
  logoContainerSpan.textContent = playerName;
  logoContainerText.appendChild(logoContainerSpan);

  header_logoContainer.append(logoIcon, logoTitle, logoContainerText)

  /* Content Container */
  header_contentContainer.append(templateHeaderGames(headerTexts), templateHeaderMenu(headerTexts), header_footer);

  //MOBILE HEADER
  templateHeaderMobile(header, headerContainer, headerMobileOverlay);
  return header;
}

