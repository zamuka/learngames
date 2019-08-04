import {
  init, ctx, canvas, setPixel, line,
} from '../sandbox/canvasLibrary.js';

const heightMap = [];
const ZOOM = 2;
const padMinBorderDistance = 50;
const TREE_HEIGHT = 25;
const snowCount = 0;
let timestamp = 0;

const landingPad = {
  width: 40,
  position: -1,
  start: -1,
  end: -1,
};

const level = {
  heightMap: [],
  stars: [],
  lander: {
    x: 30,
    y: 30,
    // px / sec
    vy: 0,
    vx: 20,
  },
};

const distanceFromPadForTrees = 10;
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

function createLandscape(height) {
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

  console.log(heightMap.length);
}


function drawLandscape() {
  const snowSpawnHeight = 160;
  let x = 0;
  while (x < heightMap.length) {
    const y = heightMap[x];
    setPixel(x, y);
    setPixel(x, y + 1);
    if (y < snowSpawnHeight) {
      ctx.save();
      ctx.fillStyle = 'rgb(255, 255, 255)';
      setPixel(x, y - 1);
      ctx.restore();
    }
    x = x + 1;
  }
}

function addTrees(treeCount) {
  for (let i = 0; i < treeCount;) {
    const treeX = getRandomInt(getScreenWidth());
    if (treeX < landingPad.start - distanceFromPadForTrees
        || treeX > landingPad.end + distanceFromPadForTrees) {
      line(treeX, heightMap[treeX] - TREE_HEIGHT, treeX, heightMap[treeX]);
      i = i + 1;
    }
    console.log('treeX :', treeX);
    console.log('landingPad :', landingPad.position);
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
  const star = {
    x: 0,
    y: 0,
  };

  do {
    star.x = getRandomInt(getScreenWidth());
    star.y = getRandomInt(getScreenHeight());
  } while (star.y > heightMap[star.x]);

  level.stars.push(star);
}

function createStars(starCount) {
  for (let i = 0; i < starCount; i = i + 1) {
    addStar();
  }
}

const drawStars = () => {
  ctx.save();
  ctx.fillStyle = 'rgb(255, 255, 255)';
  level.stars.forEach((star) => {
    setPixel(star.x, star.y);
  });
  ctx.restore();
};

function drawLander() {
  ctx.fillRect(
    Math.floor(level.lander.x - 5), Math.floor(level.lander.y - 5), 11, 11,
  );
}

// pixel / s * s
const g = 10;
/**
 *
 * @param {number} dt frame delta in ms
 */
function operateLander(dt) {
  const frameTime = dt / 1000;

  level.lander.vy = level.lander.vy + g * frameTime;

  // if (level.lander.y > heightMap[Math.round(level.lander.x)]) {
  //   level.lander.vy = -Math.abs(level.lander.vy);
  // }

  level.lander.x = level.lander.x + level.lander.vx * frameTime;
  level.lander.y = level.lander.y + level.lander.vy * frameTime;

}

function drawFrame(t) {
  const dt = t - timestamp;
  timestamp = t;

  clearScreen('rgb( 54, 49, 137)');
  drawLandscape();
  drawStars();

  operateLander(dt);
  drawLander();


  // addTrees(10);
  requestAnimationFrame(drawFrame);
}

function main() {
  init(ZOOM);
  ctx.fillStyle = 'rgb(150, 150, 150)';


  createLandscape(200);
  createStars(100);

  // addTrees(10);
  requestAnimationFrame(drawFrame);
}

window.onload = main;
