import './intro.css'

export const printIntro = () => {
  const intro = templateIntro();
  document.body.appendChild(intro);
};

function templateIntro() {
  const introPage = document.createElement("section");
  introPage.classList.add("introPage", "dynamic-section", "flex-container");

  const introLogo = document.createElement("img");
  introLogo.classList.add('introLogo');
  introLogo.src = import.meta.env.BASE_URL + "icons/logo.svg"

  introPage.appendChild(introLogo)

  return introPage;
}