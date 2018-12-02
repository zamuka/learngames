import { GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT } from './config.js';

import GameField from './components/gamefield/gamefield.js';

function main() {
  const gameField = new GameField(GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT);

  gameField.setCell(5, 5, 'wall');
  gameField.setCell(5, 6, 'wall');
  gameField.setCell(5, 7, 'wall');
}

window.onload = main;
