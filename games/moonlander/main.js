import {
  init, ctx, canvas, setPixel, line,
} from '../sandbox/canvasLibrary.js';

const ZOOM = 2;
const SOUND_CHANGE_RATE = 1;
const MIN_ENGINE_SOUND_VOLUME = 0.02;
const MAX_ENGINE_SOUND_VOLUME = 0.5;
const padMinBorderDistance = 50;
// const TREE_HEIGHT = 25;
let frameTimeStamp = 0;

const buttons = {};

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
    angle: 0,
    rotation: 0,
    rotationAcc: Math.PI * 2,
    image: new Image(),
    width: 32,
    height: 32,
    thrustAcc: 40,
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
function adjustEngineSound(frameTime) {
  const sound = level.lander.sound;
  const engineVolumeDelta = SOUND_CHANGE_RATE * frameTime;
  const isMainEngineOn = +!!buttons.ArrowUp;
  const isRotationEngineOn = +!!(buttons.ArrowLeft || buttons.ArrowRight);

  const engineLoad = 0.9 * isMainEngineOn + 0.1 * isRotationEngineOn;
  const targetVolume = MIN_ENGINE_SOUND_VOLUME + (
    MAX_ENGINE_SOUND_VOLUME - MIN_ENGINE_SOUND_VOLUME) * engineLoad;

  console.log('targetVolume', targetVolume);
  if (targetVolume >= sound.volume) {
    sound.volume = Math.min(targetVolume, sound.volume + engineVolumeDelta);
  } else {
    sound.volume = Math.max(MIN_ENGINE_SOUND_VOLUME, sound.volume - engineVolumeDelta);
  }
  console.log(sound.volume);
}

function controlLander(frameTime) {
  const lander = level.lander;
  if (buttons.ArrowUp) {
    lander.vy -= lander.thrustAcc * Math.cos(lander.angle) * frameTime;
    lander.vx += lander.thrustAcc * Math.sin(lander.angle) * frameTime;
  }
  if (buttons.ArrowLeft) {
    lander.rotation -= lander.rotationAcc * frameTime;
  }
  if (buttons.ArrowRight) {
    lander.rotation += lander.rotationAcc * frameTime;
  }

  adjustEngineSound(frameTime);
}

function moveLander(frameTime) {
  const lander = level.lander;

  controlLander(frameTime);


  lander.vy = lander.vy + level.g * frameTime;

  lander.x += lander.vx * frameTime;
  lander.y += lander.vy * frameTime;
  lander.angle += lander.rotation * frameTime;
}

function drawLander() {
  const lander = level.lander;
  const spriteX = lander.x - Math.round(lander.width / 2);
  const spriteY = lander.y - -Math.round(lander.height / 2);

  ctx.translate(spriteX, spriteY);
  ctx.rotate(lander.angle);

  const zoomedWidth = lander.width / ZOOM;
  const zoomedHeight = lander.height / ZOOM;
  ctx.drawImage(lander.image,
    -(zoomedWidth / 2), -(zoomedHeight / 2),
    zoomedWidth, zoomedHeight);

  ctx.rotate(-lander.angle);
  ctx.translate(-spriteX, -spriteY);
}

function drawFrame() {
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

function initLanderResources() {
  level.lander.image.src = 'resources/spaceship-32x32.png';

  level.lander.sound = new Audio('resources/rocket.mp3');
  level.lander.sound.loop = true;
  level.lander.sound.play();
  level.lander.sound.volume = MIN_ENGINE_SOUND_VOLUME;
}

function main() {
  init(ZOOM);

  createLandscape(200);
  createStars(100);

  initLanderResources();

  requestAnimationFrame(nextFrame);
}


function keyDown(event) {
  buttons[event.code] = true;
}
function keyUp(event) {
  buttons[event.code] = false;
}

window.onload = main;
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
