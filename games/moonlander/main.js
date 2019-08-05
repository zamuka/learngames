import {
  init, ctx, canvas, setPixel, line,
} from '../sandbox/canvasLibrary.js';

const ZOOM = 2;
const padMinBorderDistance = 50;
// const TREE_HEIGHT = 25;
let frameTimeStamp = 0;


const level = {
  g: 5,
  snowSpawnHeight: 160,
  stars: [],
  heightMap: [],
  pad: {
    width: 40,
    position: -1,
    start: -1,
    end: -1,
  },
  lander: {
    x: 40,
    y: 40,
    /**
     * axis x speed in pixels per second
     */
    vx: 20,
    vy: 0,
    image: new Image(),
    width: 32,
    height: 32,
  },
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

function createLandscape(height) {
  let x = 0;
  let y = height;
  let vy = 0;
  let ay = 0;
  const MAX_SLOPE = 2;
  level.pad.position = Math.round(Math.random() * (getScreenWidth() - padMinBorderDistance * 2))
    + padMinBorderDistance;

  level.pad.start = level.pad.position - level.pad.width / 2;
  level.pad.end = level.pad.position + level.pad.width / 2;

  while (x < getScreenWidth()) {
    level.heightMap.push(Math.floor(y));
    x = x + 1;
    const isOnPad = x > level.pad.start && x < level.pad.end;
    if (!isOnPad) {
      ay = Math.random() - 0.5 + 0.001 * (height - y);
      vy = vy + ay;
      if (vy > MAX_SLOPE) vy = MAX_SLOPE;
      if (vy < -MAX_SLOPE) vy = -MAX_SLOPE;

      y = y + vy;
    }
  }
}

function drawLandscape() {
  for (let x = 0; x < level.heightMap.length; x = x + 1) {
    const y = level.heightMap[x];
    setPixel(x, y);
    setPixel(x, y + 1);
    if (y < level.snowSpawnHeight) {
      ctx.save();
      ctx.fillStyle = 'rgb(255, 255, 255)';
      setPixel(x, y - 1);
      ctx.restore();
    }
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
  const star = { x: 0, y: 0 };
  do {
    star.x = getRandomInt(getScreenWidth());
    star.y = getRandomInt(getScreenHeight());
  } while (star.y > level.heightMap[star.x]);

  level.stars.push(star);
}

function drawStars() {
  ctx.save();
  ctx.fillStyle = 'rgb(255, 255, 255)';

  for (let i = 0; i < level.stars.length; i = i + 1) {
    const star = level.stars[i];
    setPixel(star.x, star.y);
  }
  ctx.restore();
}

function createStars(starCount) {
  while (level.stars.length < starCount) {
    addStar();
  }
}

function moveLander(frameTime) {
  const lander = level.lander;
  lander.vy = lander.vy + level.g * frameTime;
  lander.x = lander.x + lander.vx * frameTime;
  lander.y = lander.y + lander.vy * frameTime;
}

function drawLander() {
  const lander = level.lander;
  const x = lander.x - Math.round(lander.width / 2);
  const y = lander.y - Math.round(lander.height / 2);
  ctx.drawImage(lander.image, x, y, 16, 16);
}

function drawFrame(dt) {
  ctx.fillStyle = 'rgb(150, 150, 150)';

  clearScreen('rgb( 54, 49, 137)');


  drawLandscape();
  drawStars();

  drawLander();
}

function nextFrame(timestamp) {
  // time passed from previous frame in seconds
  const dt = (timestamp - frameTimeStamp) / 1000;
  frameTimeStamp = timestamp;

  moveLander(dt);

  drawFrame(dt);
  requestAnimationFrame(nextFrame);
}

function main() {
  init(ZOOM);

  createLandscape(200);
  createStars(100);
  level.lander.image.src = 'spaceship-32x32.png';

  requestAnimationFrame(nextFrame);
}


window.onload = main;
