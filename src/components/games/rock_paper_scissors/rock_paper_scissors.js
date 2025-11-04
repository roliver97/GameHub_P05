import "./rock_paper_scissors.css";
import { updateTempData } from "../../data/tempData/tempData.js";
import { updateUI } from "../../data/ui/ui.js";
import { updatePlayerData } from "../../data/playerData/playerData.js";

export const templateGame = () => {
  const board = document.createElement("div");
  board.classList.add("rockPaperScissorsBoard");

  const resultBoard = document.createElement("div");
  resultBoard.classList.add("rockPaperScissors_ResultBoard", "hidden");
  resultBoard.innerHTML = `
  <div class="userChoice"> 
    <img src="" alt="user choice icon"/>
    <h4> </h4>
    <p> </p> 
  </div>
  <div class="result">
    <h2></h2>
    <div>
      <img />
      <h4></h4>
    </div>
  </div>
  <div class="compChoice">
   <img src="" alt="computer choice icon"/> 
   <h4> </h4> 
   <p> </p> 
  </div>
`;

  const selectionBoard = document.createElement("div");
  selectionBoard.classList.add("rockPaperScissors_SelectionBoard");

  const options = [
    { name: "Rock", icon: "icons/rock_paper_scissors/rock.png" },
    { name: "Paper", icon: "icons/rock_paper_scissors/paper.png" },
    { name: "Scissors", icon: "icons/rock_paper_scissors/scissors.png" }
  ];

  options.forEach(opt => {
    const cell = document.createElement("button");
    cell.classList.add("rockPaperScissorsCell", `${opt.name.toLowerCase()}Cell`);
    const img = document.createElement("img");
    img.src = opt.icon;
    const text = document.createElement("h4");
    text.textContent = opt.name;
    cell.append(img, text);

    cell.addEventListener("click", () => {
      initGame(board)
    });

    selectionBoard.append(cell);
  });

  board.append(resultBoard, selectionBoard)
  return board;
}

export function initGame(gameBoard) {
  let gameActive = true;
  const cells = gameBoard.querySelectorAll(".rockPaperScissorsCell");
  const resultBoard = gameBoard.querySelector(".rockPaperScissors_ResultBoard")

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (!gameActive) return;

      const userChoice = cell.querySelector("h4").textContent.toLowerCase();
      const compOptions = ["rock", "paper", "scissors"];
      const compChoice = compOptions[Math.floor(Math.random() * 3)];

      updateTempData("rock-paper-scissors", {userChoice: userChoice, compChoice: compChoice});

      const winner = checkWinner(userChoice, compChoice);

      const iconMap = {
        rock: "icons/rock_paper_scissors/rock.png",
        paper: "icons/rock_paper_scissors/paper.png",
        scissors: "icons/rock_paper_scissors/scissors.png",
        win: "icons/rock_paper_scissors/win_icon.png",
        lose: "icons/rock_paper_scissors/lose_icon.webp",
        draw: "icons/rock_paper_scissors/draw_icon.webp"
      };
      
        resultBoard.classList.remove("hidden");
        resultBoard.classList.add("rockPaperScissors_ResultBoard");

        resultBoard.querySelector(".userChoice img").src = iconMap[userChoice];
        resultBoard.querySelector(".userChoice h4").textContent = "You";
        resultBoard.querySelector(".userChoice p").textContent = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);;

        resultBoard.querySelector(".result h2").textContent = "VS";

        resultBoard.querySelector(".compChoice img").src = iconMap[compChoice];
        resultBoard.querySelector(".compChoice h4").textContent = "Computer";
        resultBoard.querySelector(".compChoice p").textContent = compChoice.charAt(0).toUpperCase() + compChoice.slice(1);;

      if (winner === "draw") {
        resultBoard.querySelector(".result h4").textContent = "It's a Draw!";
        resultBoard.querySelector(".result img").src = iconMap.draw;
        gameActive = false;
        updateTempData("rock-paper-scissors", { winner: "draw" });
        updatePlayerData("rock-paper-scissors", {result:"draw"});
        updateUI("rock-paper-scissors");
        } else if (winner === "user") {
          resultBoard.querySelector(".result h4").textContent = "You Win!";
          resultBoard.querySelector(".result img").src = iconMap.win;
          gameActive = false;
          updateTempData("rock-paper-scissors", { winner: "user" });
          updatePlayerData("rock-paper-scissors", {result:"win"})
          updateUI("rock-paper-scissors");
          } else{
            resultBoard.querySelector(".result h4").textContent = "You Lose!";
            resultBoard.querySelector(".result img").src = iconMap.lose;
            gameActive = false;
            updateTempData("rock-paper-scissors", { winner: "comp" });
            updatePlayerData("rock-paper-scissors", {result:"lose"})
            updateUI("rock-paper-scissors");
            }
    })
  });
}

function checkWinner(userChoice, compChoice) {
  if (userChoice === compChoice) return "draw";
  if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    return "user";
  } else {
    return "comp";
  }
}