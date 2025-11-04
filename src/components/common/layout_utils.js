import { printGames } from "../layout/pages/gamesPage/gamesPage";

export function toggleIntroAfterTimeout(timeout = 2000) {
 const dynamicSection = document.querySelectorAll(".dynamic-section");
 const dashboard = document.querySelector("#dashboard");
 const playerData = JSON.parse(localStorage.getItem("playerData"));
 const header = document.querySelector("header");
 const hamburger_button = document.querySelector("#hamburger_button");

 if(playerData){
    dynamicSection.forEach(sec => {
      sec.classList.add('hidden');
    });

      if (window.innerWidth < 750) {
        header.classList.add('hidden');
        hamburger_button.classList.remove('hidden');
        header.classList.add('header_closed');
      } else {
          header.classList.remove('hidden');
        }
        
    } else {
    setTimeout(() => {
      dynamicSection.forEach(sec => {
        sec.classList.toggle('hidden');
      });
    }, timeout);
    }
}

export function showSection(sectionName) {
  const allSections = document.querySelectorAll("section");
  const allButtons = document.querySelectorAll(".header__contentContainer-button");
  const header = document.querySelector("header");
  const tempData = JSON.parse(sessionStorage.getItem("tempData")) || {};

  const currentSection = sectionName || tempData.currentSection || "dashboard";

  tempData.currentSection = currentSection;
  sessionStorage.setItem("tempData", JSON.stringify(tempData));

  allSections.forEach(sec => sec.classList.add("hidden"));
  header.classList.remove("hidden");

  const targetSection = document.getElementById(currentSection);
    if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.classList.add("active");
  
      if (currentSection === "gamesPage" && tempData.currentGame) {
          const container = document.querySelector("#gamesPage");
          container.innerHTML = "";
          container.append(printGames(tempData.currentGame));
        }

      } else { 
            console.warn(`No se ha encontrado la sección con id="${currentSection}"`);
          }

    allButtons.forEach(btn => {
      const section = btn.dataset.section;
      const isCurrentSection = section === currentSection;
      const isCurrentGame =
        tempData.currentSection === "gamesPage" &&
        tempData.currentGame === section;

      btn.classList.toggle("active", isCurrentSection || isCurrentGame);
    });
  }

