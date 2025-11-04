import { printDashboard } from "./menu/dashboard/dashboard.js";
import { printLeaderboard } from "./menu/leaderboard/leaderboard.js";
import { showSection } from "../../common/layout_utils.js";
import { printProfile } from "./menu/profile/profile.js";
import { printGamesPage } from "./gamesPage/gamesPage.js";

 

export const printPages = (playerData) => {
  const gamesPage = printGamesPage();

  const dashboard = printDashboard(playerData);
  const leaderboard = printLeaderboard(playerData);
  const profile = printProfile(playerData);

  document.body.append(gamesPage);
  document.body.append(dashboard);
  document.body.append(leaderboard);
  document.body.append(profile);

  showSection();
}