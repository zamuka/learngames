import { GAMEFIELD_WIDTH, GAMEFIELD_HEIGHT, INITIAL_LENGTH } from './config.js';

import GameField from './components/gamefield/gamefield.js';

let cycleLengthMs = 200;
let time = 0;
let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;
let paused = false;
let tailDelay = 0;
let score = 0;

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

  const hitCell = gameField.getCell(headX, headY);

  switch (hitCell) {
    case 'food': 
      cycleLengthMs = cycleLengthMs * 0.9;
      score = score + 1;
      tailDelay = 1;
      addFood();
      break;

    case 'Enemy':
      cycleLengthMs = cycleLengthMs * 0.1;
      score = score + 0;
      tailDelay = 100;
      addEnemy();
      break;

    case '':
      break;

    default:
      paused = true;
      alert(`Game Over! You score : ${score}`);
      resetGame();
      return;
  }

  drawHead();

  moveTail();
  // schedule next cycle run
  if (!paused) {
    setTimeout(tick, cycleLengthMs);
  }
}

function addEnemy() {
  let EnemyX;
  let EnemyY;
  do {
    EnemyX = Math.floor(Math.random() * (GAMEFIELD_WIDTH - 2)) + 1;
    EnemyY = Math.floor(Math.random() * (GAMEFIELD_HEIGHT - 2)) + 1;
  } while (gameField.getCell(EnemyX, EnemyY) !== '');

  gameField.setCell(EnemyX, EnemyY, 'Enemy');
}

function addFood() {
  let foodX;
  let foodY;
  do {
    foodX = Math.floor(Math.random() * (GAMEFIELD_WIDTH - 2)) + 1;
    foodY = Math.floor(Math.random() * (GAMEFIELD_HEIGHT - 2)) + 1;
  } while (gameField.getCell(foodX, foodY) !== '');

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

  addEnemy();

  cycleLengthMs = 400;
  score = 0;
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

