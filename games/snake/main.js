import { GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT } from './config.js';

import GameField from './components/gamefield/gamefield.js';

const cycleLingthMs = 100;
let time = 0;
let headX = 0;
let headY = 0;
const tailX = 0;
const tailY = 0;

// left, right, up, down
let dir = 'up';

let gameField;

function tick() {
  time = time + 1;

  if (dir === 'up') {
    headY = headY - 1;
  }
  if (dir === 'down') {
    headY = headY + 1;
  }

  if (dir === 'right') {
    headX = headX + 1;
  }
  if (dir === 'left') {
    headX = headX - 1;
  }
  gameField.setCell(headX, headY, `snake ${dir}`);

  // schedule next cycle run
  setTimeout(tick, cycleLingthMs);
}

function keyDown(event) {
  if (event.key === 'ArrowUp') dir = 'up';
  if (event.key === 'ArrowDown') dir = 'down';
  if (event.key === 'ArrowLeft') dir = 'left';
  if (event.key === 'ArrowRight') dir = 'right';
  console.log(event);
}

function main() {
  gameField = new GameField(GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT);

  for (let x = 0; x < GAMEFIELD_WIDTH; x = 1 + x) {
    gameField.setCell(x, 0, 'wall');
    gameField.setCell(x, GAMEFIELD_HEIGHT - 1, 'wall');
  }

  for (let y = 0; y < GAMEFIELD_HEIGHT; y = 1 + y) {
    gameField.setCell(0, y, 'wall');
    gameField.setCell(GAMEFIELD_WIDTH - 1, y, 'wall');
  }


  headX = 15;
  headY = 15;
  dir = 'down';
  tick();
}


window.onload = main;
window.onkeydown = keyDown;
