import {
  init, ctx, canvas, setPixel, line,
} from '../sandbox/canvasLibrary.js';

const heightMap = [];
const ZOOM = 2;
const padMinBorderDistance = 50;
const TREE_HEIGHT = 25;
let starCount = 0;
let snowCount = 0;

const landingPad = {
  width: 40,
  position: -1,
  start: -1,
  end: -1,
};

function getScreenWidth() {
  return canvas.width / ZOOM;
}

function getScreenHeight() {
  return canvas.height / ZOOM;
}

function clearScreen(color) {
  ctx.save();

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, getScreenWidth() - 1, getScreenHeight() - 1);

  ctx.restore();
}

function drawLandscape(height) {
  let x = 0;
  let y = height;
  let vy = 0;
  let ay = 0;

  landingPad.position = Math.round(Math.random() * (getScreenWidth() - padMinBorderDistance * 2))
    + padMinBorderDistance;

  const MAX_SLOPE = 2;
  landingPad.start = landingPad.position - landingPad.width / 2;
  landingPad.end = landingPad.position + landingPad.width / 2;

  while (x < getScreenWidth()) {
    setPixel(x, y);
    heightMap.push(Math.floor(y));
    x = x + 1;
    const isOnPad = x > landingPad.start && x < landingPad.end;
    if (!isOnPad) {
      ay = Math.random() - 0.5 + 0.001 * (height - y);
      vy = vy + ay;
      if (vy > MAX_SLOPE) vy = MAX_SLOPE;
      if (vy < -MAX_SLOPE) vy = -MAX_SLOPE;

      y = y + vy;
    }
  }
}

function addTree() {
  const treeX = getRandomInt(getScreenWidth());
  if (landingPad.position < treeX) {
    line(treeX, heightMap[treeX] - TREE_HEIGHT, treeX, heightMap[treeX]);
  }
}


/**
 * @param {number} max
 * @returns random number up to max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addStar() {
  let starX;
  let starY;

  do {
    starX = getRandomInt(getScreenWidth());
    starY = getRandomInt(getScreenHeight());
  } while (starY > heightMap[starX]);

  setPixel(starX, starY);
  starCount = starCount + 1;
}

const drawStars = () => {
  ctx.save();
  ctx.fillStyle = 'rgb(255, 255, 255)';
  for (let i = 0; i < 100; i = i + 1) {
    addStar();
  }
  ctx.restore();
};

function main() {
  init(ZOOM);
  ctx.fillStyle = 'rgb(150, 150, 150)';

  clearScreen('rgb( 54, 49, 137)');

  drawLandscape(200);

  const drawPixelBelowGround = (x) => {
    setPixel(x, heightMap[x] + 1);
  };

  let j = 0;
  while (j < heightMap.length) {
    drawPixelBelowGround(j);
    j = j + 1;
  }
  ctx.fillStyle = 'rgb(255, 255, 255)';
  const snowSpawnHeight = 160;
  for (let k = 0; k < heightMap.length; k = k + 1) {
    const y = heightMap[k] - 1;
    if (y < snowSpawnHeight) {
      setPixel(k, y);
      snowCount = snowCount + 1;
    }
  }

  drawStars();
  console.log('starCount :', starCount);
  console.log('snowCount :', snowCount);

  console.log(landingPad);

  for (let i = 0; i < 10; i = i + 1) {
    addTree();
  }
}


window.onload = main;
