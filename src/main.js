import './style/global.css';
import { printIntro } from './components/layout/intro/intro.js';
import { printWelcomePage } from './components/layout/welcome/welcome.js';
import { printHeader } from './components/layout/header/header.js';
import { toggleIntroAfterTimeout } from './components/common/layout_utils.js';
import { printPages } from './components/layout/pages/pages.js';

const playerData = JSON.parse(localStorage.getItem('playerData'));

if (playerData) {
  printHeader(playerData);
  printPages(playerData);
} else {
printIntro();
printWelcomePage();
toggleIntroAfterTimeout(2000);
}




