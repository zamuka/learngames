import { GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT, INITIAL_LENGTH } from './config.js';

import GameField from './components/gamefield/gamefield.js';

const cycleLingthMs = 300;
let time = 0;
let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;
let paused = false;
let tailDelay = 0;

// left, right, up, down
let dir = 'up';

let gameField;

function moveHead() {
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
}

function drawHead() {
  gameField.setCell(headX, headY, `snake ${dir}`);
}

function moveTail() {
  if (tailDelay > 0) {
    tailDelay = tailDelay - 1;
    return;
  }

  const cell = gameField.getCell(tailX, tailY);
  gameField.setCell(tailX, tailY, '');

  console.log(cell, tailX, tailX);
  if (cell === 'snake up') {
    tailY = tailY - 1;
  }
  if (cell === 'snake down') {
    tailY = tailY + 1;
  }
  if (cell === 'snake right') {
    tailX = tailX + 1;
  }
  if (cell === 'snake left') {
    tailX = tailX - 1;
  }
}

function tick() {
  time = time + 1;

  drawHead();
  moveHead();

  const cell = gameField.getCell(headX, headY);
  if (cell !== '') {
    paused = true;
    alert('Game Over!');
    resetGame();
    return;
  }
  drawHead();

  moveTail();
  // schedule next cycle run
  if (!paused) {
    setTimeout(tick, cycleLingthMs);
  }
}

function addFood() {
  // TODO: add new food when food is eaten
  const foodX = Math.floor(Math.random() * (GAMEFIELD_WIDTH - 2)) + 1;
  const foodY = Math.floor(Math.random() * (GAMEFIELD_HEIGHT - 2)) + 1;
  gameField.setCell(foodX, foodY, 'food');
}

function resetGame() {
  for (let x = 0; x < GAMEFIELD_WIDTH; x = 1 + x) {
    for (let y = 0; y < GAMEFIELD_HEIGHT; y = 1 + y) {
      gameField.setCell(x, y, '');
    }
  }
  for (let x = 0; x < GAMEFIELD_WIDTH; x = 1 + x) {
    gameField.setCell(x, 0, 'wall');
    gameField.setCell(x, GAMEFIELD_HEIGHT - 1, 'wall');
  }

  for (let y = 0; y < GAMEFIELD_HEIGHT; y = 1 + y) {
    gameField.setCell(0, y, 'wall');
    gameField.setCell(GAMEFIELD_WIDTH - 1, y, 'wall');
  }

  addFood();

  headX = 5;
  headY = 5;
  tailX = headX;
  tailY = headY;
  tailDelay = INITIAL_LENGTH;
  paused = false;
  dir = 'right';
  tick();
}


function keyDown(event) {
  if (event.code === 'ArrowUp' && dir !== 'down') dir = 'up';
  if (event.code === 'ArrowDown' && dir !== 'up') dir = 'down';
  if (event.code === 'ArrowLeft' && dir !== 'right') dir = 'left';
  if (event.code === 'ArrowRight' && dir !== 'left') dir = 'right';
  if (event.code === 'Enter') tailDelay = tailDelay + 10;
  if (event.code === 'Space') {
    paused = !paused;
    if (!paused) {
      tick();
    }
  }

  console.log(event);
}

function main() {
  gameField = new GameField(GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT);
  resetGame();
}

window.onload = main;
window.onkeydown = keyDown;
