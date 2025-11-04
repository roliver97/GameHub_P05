
  export const templateHeaderMobile = (header, headerContainer, headerMobileOverlay) => {
    const hamburger_button = hamburgerButton(header, headerContainer, headerMobileOverlay);
    header.prepend(hamburger_button);
    
    handleResponsiveHeader(header, headerContainer, hamburger_button, headerMobileOverlay);
    window.addEventListener("resize", () => handleResponsiveHeader(header, headerContainer, hamburger_button, headerMobileOverlay));
    

    headerButtonsListeners(header, headerContainer, headerMobileOverlay);
    isClickInsideHeaderListeners(header, headerContainer, hamburger_button, headerMobileOverlay);
  };

  function hamburgerButton(header, headerContainer, headerMobileOverlay) {
    const hamburger_button = document.createElement("button");
    hamburger_button.id = "hamburger_button"
    const hamburger_img = document.createElement("img");
    hamburger_img.alt = "Mobile menu icon";

    hamburger_button.addEventListener("click", () => {
      headerContainer.classList.toggle("hidden");
      header.classList.toggle("header_closed");
      headerMobileOverlay.classList.toggle("hidden");
      if (header.classList.contains("header_closed")) {
        hamburger_img.src = import.meta.env.BASE_URL + "icons/header/hamburger_orange_right.svg";
      } else {
        hamburger_img.src = import.meta.env.BASE_URL + "icons/header/hamburger_orange_left.svg";
      }
        const allSections = document.querySelectorAll("section");
        if (!headerContainer.classList.contains("hidden")) {
          headerContainer.classList.add("mobile");
          allSections.forEach(s => s.classList.add("blurred"));
        } else {
          allSections.forEach(s => s.classList.remove("blurred"))
        }

    });
    
    hamburger_button.append(hamburger_img);
    return hamburger_button;
  }

   function handleResponsiveHeader(header, headerContainer, hamburger_button, headerMobileOverlay) {
    const allSections = document.querySelectorAll("section");
    allSections.forEach(s => s.classList.remove("blurred"));
    headerMobileOverlay.classList.add("hidden");

    if (window.innerWidth < 1000) {
      headerContainer.classList.add("hidden");
      header.classList.add("header_closed");
      hamburger_button.querySelector("img").src = import.meta.env.BASE_URL + "icons/header/hamburger_orange_right.svg";
      hamburger_button.classList.remove("hidden");
      headerContainer.classList.remove("mobile");
    } else {
      header.classList.remove("header_closed");
      hamburger_button.querySelector("img").src = import.meta.env.BASE_URL + "icons/header/hamburger_orange_left.svg";
      headerContainer.classList.remove("hidden", "mobile");
      hamburger_button.classList.add("hidden");
    }
  }
 
  function headerButtonsListeners(header, headerContainer, headerMobileOverlay) {
      const headerButtons = headerContainer.querySelectorAll(".header__contentContainer-button");
    headerButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const allSections = document.querySelectorAll("section");
        allSections.forEach(s => s.classList.remove("blurred"));
        headerMobileOverlay.classList.add("hidden");
        if (window.innerWidth < 1000) {
          headerContainer.classList.add("hidden");
          header.classList.add("header_closed");
          hamburger_button.querySelector("img").src = import.meta.env.BASE_URL + "icons/header/hamburger_orange_right.svg";
        }
      });
    });
  }

  function isClickInsideHeaderListeners(header, headerContainer, hamburger_button, headerMobileOverlay) {
      document.addEventListener("click", (event) => {
      const allSections = document.querySelectorAll("section");
      const isClickInsideHeader = header.contains(event.target);
      const isClickOnHamburger = hamburger_button.contains(event.target);
      const isClickOnOverlay  = headerMobileOverlay.contains(event.target);

      if (
      window.innerWidth < 1000 && !isClickInsideHeader && !isClickOnHamburger || isClickOnOverlay) {
        headerContainer.classList.add("hidden");
        headerMobileOverlay.classList.add("hidden");
        header.classList.add("header_closed");
        hamburger_button.querySelector("img").src = import.meta.env.BASE_URL + "icons/header/hamburger_orange_right.svg";
        allSections.forEach(s => s.classList.remove("blurred"))
      }
    });
  }
