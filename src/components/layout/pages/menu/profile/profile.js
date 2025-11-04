import './profile.css'
import texts from "./profile_texts.json"

export const printProfile = (playerData) => {
  const profile = templateProfile(playerData);
  return profile;
};

function templateProfile(playerData) {

  const profile = document.createElement("section");
  profile.id = "profile";
  profile.classList.add("section", "hidden");

  const profileTitleContainer = document.createElement("div");
  profileTitleContainer.classList.add("profile__titleContainer", "flex-container");
  const profileTitle = document.createElement("h1");
  const profileIcon = document.createElement("img");
  profileTitle.textContent = "Player Profile";
  profileIcon.src = import.meta.env.BASE_URL + "icons/profile/profile.webp";

  const profileResultsContainer = document.createElement("div");
  profileResultsContainer.classList.add("profile__resultsContainer", "flex-container");

  const playerInfoContainer = document.createElement("div");
  playerInfoContainer.classList.add("profile__playerInfoContainer", "flex-container");
  const playerInfoTitle = document.createElement("h2");
  playerInfoTitle.textContent = texts.playerInfo.title;
  const playerNameDiv = document.createElement("div");
  const playerNameSubtitle = document.createElement("h4");
  playerNameSubtitle.textContent = texts.playerInfo.playerName_subtitle;
  const playerName = document.createElement("p");
  playerName.textContent = playerData.name;
  const memberSinceDiv = document.createElement("div");
  const memberSinceSubtitle = document.createElement("h4");
  memberSinceSubtitle.textContent = texts.playerInfo.memberSince_subtitle;
  const memberSince = document.createElement("p");
  memberSince.textContent = playerData.initDate;
  const favoriteGameDiv = document.createElement("div");
  const favoriteGameSubtitle = document.createElement("h4");
  favoriteGameSubtitle.textContent = texts.playerInfo.favoriteGame_subtitle;
  const favoriteGame = document.createElement("p");

  if(playerData.favoriteGame === undefined) {
    favoriteGame.textContent = "There's nothing to show here yet...";
    favoriteGame.classList.add("nothingToShow");
  } else {
    favoriteGame.textContent = playerData.favoriteGame;
    favoriteGame.classList.remove("nothingToShow");
  }
  
  const gameStatisticsContainer = document.createElement("div");
  gameStatisticsContainer.classList.add("profile__gameStatisticsContainer", "flex-container");
  const gameStatisticsTitle = document.createElement("h2");
  gameStatisticsTitle.textContent = texts.gameStatistics.title;
  const gamesPlayedDiv = document.createElement("div");
  const gamesPlayedSubtitle = document.createElement("h4");
  gamesPlayedSubtitle.textContent = texts.gameStatistics.gamesPlayed_subtitle;
  const gamesPlayed = document.createElement("p");
  gamesPlayed.textContent = playerData.totalGames;
  const totalScoreDiv = document.createElement("div");
  const totalScoreSubtitle = document.createElement("h4");
  totalScoreSubtitle.textContent = texts.gameStatistics.totalScore_subtitle;
  const totalScore = document.createElement("p");
  totalScore.textContent = playerData.totalScore;
  const averageScoreDiv = document.createElement("div");
  const AverageScoreSubtitle = document.createElement("h4");
  AverageScoreSubtitle.textContent = texts.gameStatistics.averageScore_subtitle;
  const averageScore = document.createElement("p");
  averageScore.textContent = playerData.averageScore;

  profile.append(profileTitleContainer, profileResultsContainer);
  profileTitleContainer.append(profileIcon, profileTitle);
  profileResultsContainer.append(playerInfoContainer, gameStatisticsContainer);

  playerInfoContainer.append(playerInfoTitle, playerNameDiv, memberSinceDiv, favoriteGameDiv);
  playerNameDiv.append(playerNameSubtitle, playerName);
  memberSinceDiv.append(memberSinceSubtitle, memberSince);
  favoriteGameDiv.append(favoriteGameSubtitle, favoriteGame);

  gameStatisticsContainer.append(gameStatisticsTitle, gamesPlayedDiv, totalScoreDiv, averageScoreDiv);
  gamesPlayedDiv.append(gamesPlayedSubtitle, gamesPlayed);
  totalScoreDiv.append(totalScoreSubtitle, totalScore);
  averageScoreDiv.append(AverageScoreSubtitle, averageScore);

  return profile;
}