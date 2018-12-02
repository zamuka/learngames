import { GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT } from './config.js';

import GameField from './components/gamefield/gamefield.js';

const cycleLingthMs = 1000;
let cycleNumber = 0;

function tick() {
  cycleNumber += 1;
  console.log('Tick', cycleNumber);

  setTimeout(tick, cycleLingthMs);
}

function main() {
  const gameField = new GameField(GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT);

  for (let x = 0; x < GAMEFIELD_WIDTH; x = 1 + x) {
    gameField.setCell(x, 0, 'wall');
    gameField.setCell(x, GAMEFIELD_HEIGHT - 1, 'wall');
  }

  for (let y = 0; y < GAMEFIELD_HEIGHT; y = 1 + y) {
    gameField.setCell(0, y, 'wall');
    gameField.setCell(GAMEFIELD_WIDTH - 1, y, 'wall');
  }


  // x 3, y 4 => x10, y20
  for (let x = 5; x < 15; x += 2) {
    gameField.setCell(x, x, 'wall');
  }

  tick();
}


window.onload = main;
