import "./memory_cards.css";
import texts from "./memory_cards_texts.json"
import { updateTempData } from "../../data/tempData/tempData.js";
import { updateUI } from "../../data/ui/ui.js";
import { updatePlayerData } from "../../data/playerData/playerData.js";

export const templateGame = () => {
  const board = document.createElement("div");
  board.classList.add("memoryCardsBoard");

  return board;
}

let timerInterval = null;
let timeElapsed = 0;

export function initGame(gameBoard) {
  const cardProperties = texts.cards;
  let gameActive = true;
  let selectedCards = [];
  let foundedCards = [];
  let timerStarted = false;

  if (timerInterval) clearInterval(timerInterval);
  timeElapsed = 0;
  updateTempData("memory-cards", { time: "00:00" });

  const cards = cardProperties.reduce((acc, card) => {
    acc.push(card, { ...card }); //Aquí, como se trata de un objeto, spread operator (...) crea una copia de dicho objeto
    return acc;
  }, []);

  shuffleCards(cards);

    function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    function stopTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      updateTempData("memory-cards", { time: formatTime(timeElapsed) });
    }

    function startTimer() {
      timeElapsed = 0;
      timerInterval = setInterval(() => {
        timeElapsed++;
        updateTempData("memory-cards", { time: formatTime(timeElapsed) });
        updateUI("memory-cards");
      }, 1000);
    }

  cards.forEach(card => {
    const button = document.createElement("button");
    button.classList.add("cardButton")
    button.id = card.id;

    const defaultIcon = document.createElement("img");
    defaultIcon.classList.add("cardDefaultIcon")
    defaultIcon.src = import.meta.env.BASE_URL + "icons/memory/memory_cards/questionMark_card.png";
    defaultIcon.alt = "Default question mark card icon";

    const icon = document.createElement("img");
    icon.classList.add("cardIcon", "hidden");
    icon.src = import.meta.env.BASE_URL + card.icon;
    icon.alt = card.name + "Card icon";

    button.append(defaultIcon,icon);
    gameBoard.append(button);

    //EVENT LISTENERS
    button.addEventListener("click", () => {
      const actionPrompt = document.querySelector(".gameActionPrompt")

      if(!gameActive|| button.classList.contains("cardFounded") || button.classList.contains("cardSelected")) return;

      button.classList.add("cardSelected");
      icon.classList.remove("hidden");
      defaultIcon.classList.add("hidden");
      selectedCards.push({ card, button, icon, defaultIcon });

      if(selectedCards.length === 1){
        actionPrompt.textContent = "🎮 Find all 8 matching pairs";
        actionPrompt.classList.add("actionPromptStarted"); 
      } else if(selectedCards.length === 2){
          gameActive = false;
          updateUI("memory-cards");
          const isPair = compareCards(selectedCards);
          if (!timerStarted) {
          startTimer();
          timerStarted = true;
      }
          if(isPair){
            selectedCards.forEach(selectedCard => {
              selectedCard.button.classList.add("cardFounded");
              selectedCard.button.classList.remove("cardSelected")
            });
            foundedCards.push(...selectedCards); //Aquí, como se trata de un array, spread operator (...) desempaqueta dicho array
            selectedCards = [];
            gameActive = true;
            updateTempData("memory-cards", { moves: 1, matches: 1});
            updateUI("memory-cards");
          } else {
            updateTempData("memory-cards", { moves: 1});
            updateUI("memory-cards");
            setTimeout(() => {
              selectedCards.forEach(selectedCard => {
                selectedCard.button.classList.remove("cardSelected");
                selectedCard.icon.classList.add("hidden");
                selectedCard.defaultIcon.classList.remove("hidden");
              });
              selectedCards = [];
              gameActive = true;
            }, 500);
          }

          if(foundedCards.length === cards.length) {
            stopTimer();
            actionPrompt.textContent = "🎉 Congratulations! You win";
            actionPrompt.classList.add("actionPromptWin");
            updatePlayerData("memory-cards", {result:"win", time: formatTime(timeElapsed)});
            updateUI("memory-cards");
          }
      }
    });
   });
}

export function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [cards[i], cards[j]] = [cards[j], cards[i]]; // swap
  }
  return cards;
}

export function compareCards(selectedCards) {
  if(selectedCards[0].card.cardNumber === selectedCards[1].card.cardNumber) {
    return true
  } else return false;
}
