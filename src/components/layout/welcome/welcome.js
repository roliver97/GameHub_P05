import './welcome.css'
import { printHeader } from '../header/header.js';
import { printPages } from '../pages/pages.js';
import texts from "./welcome_texts.json"
import { createPlayerProfile } from '../../data/playerData/playerData.js';

export const printWelcomePage = () => {
  const welcomePage = templateWelcomePage();
  document.body.appendChild(welcomePage);
  welcomeEventListeners(welcomePage);
};

function templateWelcomePage() {
  const welcomePage = document.createElement("section");
  welcomePage.classList.add("welcomePage", "dynamic-section", "flex-container","hidden");
  
  const logoIcon = document.createElement("img");
  logoIcon.src = import.meta.env.BASE_URL + "icons/logo.svg";

  const logoTitle = document.createElement("h1");
  logoTitle.textContent = texts.welcomePage.logo;

  const title = document.createElement("h2");
  title.textContent = texts.welcomePage.title;

  const subtitle = document.createElement("p");
  subtitle.textContent = texts.welcomePage.subtitle;

  const formDiv = document.createElement("div");
  formDiv.classList.add("welcomePage__formDiv")

  const label = document.createElement("label");
  label.textContent = texts.welcomePage.label;
  label.setAttribute("for", "playerName");

  const input = document.createElement("input");
  input.id = "playerName";
  input.placeholder = texts.welcomePage.inputPlaceholder;

  const button = document.createElement("button");
  button.textContent = texts.welcomePage.submitButton;

  welcomePage.append(logoIcon, logoTitle, title, subtitle, formDiv);
  formDiv.append(label, input, button);

  return welcomePage;
}

export function welcomeEventListeners(welcomePage) {
  const input = welcomePage.querySelector("#playerName");
  const button = welcomePage.querySelector("button");

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const playerName = input.value.trim();
     
    if (playerName) {
      const formattedName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
      createPlayerProfile(formattedName);
    }
     else {
      return alert("🎮 Please enter a nickname to continue");
     }

    const playerData = JSON.parse(localStorage.getItem('playerData'));

    printHeader(playerData); 
    printPages(playerData);
    
    showSection("dashboard");
    
  });
}