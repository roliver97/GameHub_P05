import { showSection } from "../../../common/layout_utils";
import { updateUI } from "../../../data/ui/ui";

export function templateHeaderMenu(headerTexts) {
  const header_menuDiv = document.createElement("div");
  header_menuDiv.classList.add("header__contentContainer-menuDiv", "flex-container");

  const menuTitle = document.createElement("h2");
  menuTitle.textContent = headerTexts.menuDiv.title;

  const options = headerTexts.menuDiv.options;
  const optionsList = document.createElement("ul");

  options.forEach(option => {
    const optionListItem = document.createElement("li");
    const optionButton = document.createElement("button");
    optionButton.classList.add("header__contentContainer-button")
    const optionIcon = document.createElement("img");
    const optionName = document.createElement("p");

    optionIcon.src = import.meta.env.BASE_URL + option.icon;
    optionIcon.alt = `${option.name} icon`;

    optionName.textContent = option.name;

    optionButton.dataset.section = option.name.toLowerCase().replace(/\s/g, "-");

    optionButton.addEventListener("click", () => {
      updateUI()
      const allButtons = document.querySelectorAll(".header__contentContainer-button");
      allButtons.forEach(btn => btn.classList.remove("active"));

      optionButton.classList.add("active");

      showSection(optionButton.dataset.section)
    });

    optionsList.append(optionListItem);
    optionListItem.append(optionButton);
    optionButton.append(optionIcon, optionName);
  });

  header_menuDiv.append(menuTitle, optionsList);
  return header_menuDiv;
}