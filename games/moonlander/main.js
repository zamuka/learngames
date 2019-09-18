import {
  init, ctx, canvas, setPixel, line,
} from '../sandbox/canvasLibrary.js';

const ZOOM = 2;
const SOUND_CHANGE_RATE = 1;
const MIN_ENGINE_SOUND_VOLUME = 0.02;
const MAX_ENGINE_SOUND_VOLUME = 0.5;
const padMinBorderDistance = 50;
const TREE_HEIGHT = 25;
const SPARKLE_SPEED = 200;
const SPARKLE_MAX_AGE = 0.1;
const INITIAL_MUSIC_VOLUME = 0.5;
const INITIAL_FUEL_AMOUNT = 600;
const FUEL_CONSUMPTION_RATE = 100;


let frameTimeStamp = 0;

const buttons = {};

const landerStart = {
  x: 30,
  y: 30,
  /**
   * axis x speed in pixels per second
   */
  vx: 20,
  vy: 30,
  angle: 0,
  rotation: 0,
  rotationAcc: Math.PI * 2,
  fuel: INITIAL_FUEL_AMOUNT,
}

const level = {
  music: null,
  g: 5,
  snowSpawnHeight: 160,
  sparkles: [],
  stars: [],
  trees: [],
  heightMap: [],
  pad: {
    width: 40,
    position: -1,
    start: -1,
    end: -1,
  },
  lander: {
    ...landerStart,
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
  level.heightMap = [];
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
function addSparkle() {
  const sparkleDeviation = Math.random() * 0.4 - 0.2;
  const angle = level.lander.angle + Math.PI + sparkleDeviation;
  const sparkle = {
    angle,
    x: level.lander.x,
    y: level.lander.y,
    fillStyle: `rgb(255, ${getRandomInt(256)}, 0)`,
    age: 0,
    vx: SPARKLE_SPEED * Math.sin(angle) + level.lander.vx,
    vy: -SPARKLE_SPEED * Math.cos(angle) + level.lander.vy,
  };
  level.sparkles.push(sparkle);
}

function doSparkles(frameTime) {
  if (buttons.ArrowUp && level.lander.fuel) {
    addSparkle();
  }

  for (let i = 0; i < level.sparkles.length; i = i + 1) {
    const sparkle = level.sparkles[i];
    sparkle.age += frameTime;
    sparkle.x = sparkle.x + sparkle.vx * frameTime;
    sparkle.y = sparkle.y + sparkle.vy * frameTime;
  }

  while (level.sparkles.length > 0 && level.sparkles[0].age > SPARKLE_MAX_AGE) {
    level.sparkles.shift();
  }
}

function addStar() {
  const star = { x: 0, y: 0 };
  do {
    star.x = getRandomInt(getScreenWidth());
    star.y = getRandomInt(getScreenHeight());
  } while (star.y > level.heightMap[star.x]);

  level.stars.push(star);
}

function treePositionIsOk(tree) {
  return (tree.x > level.pad.end) || (tree.x < level.pad.start);
}

function addTree() {
  const tree = { x: 0, y: 0 };
  do {
    tree.x = getRandomInt(getScreenWidth());
  } while (!treePositionIsOk(tree));

  tree.y = level.heightMap[tree.x];
  level.trees.push(tree);
}

function drawSparkles() {
  ctx.save();

  for (let i = 0; i < level.sparkles.length; i = i + 1) {
    const sparkle = level.sparkles[i];
    ctx.fillStyle = sparkle.fillStyle;
    setPixel(sparkle.x, sparkle.y);
  }
  ctx.restore();
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

function drawTrees() {
  ctx.save();
  ctx.fillStyle = 'rgb(125, 125, 125)';

  for (let i = 0; i < level.trees.length; i = i + 1) {
    const tree = level.trees[i];
    line(tree.x, tree.y, tree.x, tree.y - TREE_HEIGHT);
  }
  ctx.restore();
}

function createStars(starCount) {
  level.stars = [];
  while (level.stars.length < starCount) {
    addStar();
  }
}

function createTrees(treeCount) {
  level.trees = [];
  while (level.trees.length < treeCount) {
    addTree();

  }
}

function getAngleDelta() {
  let angleDelta = Math.abs(level.lander.angle / (2 * Math.PI) % 1);
  if (angleDelta > 0.5) angleDelta = 1 - angleDelta;
  return angleDelta;
}

function adjustEngineSound(frameTime) {
  const sound = level.lander.sound;
  const engineVolumeDelta = SOUND_CHANGE_RATE * frameTime;
  const isMainEngineOn = +!!buttons.ArrowUp;
  const isRotationEngineOn = +!!(buttons.ArrowLeft || buttons.ArrowRight);

  const engineLoad = 0.9 * isMainEngineOn + 0.1 * isRotationEngineOn;
  const targetVolume = MIN_ENGINE_SOUND_VOLUME + (
    MAX_ENGINE_SOUND_VOLUME - MIN_ENGINE_SOUND_VOLUME) * engineLoad;

  if (targetVolume >= sound.volume) {
    sound.volume = Math.min(targetVolume, sound.volume + engineVolumeDelta);
  } else {
    sound.volume = Math.max(MIN_ENGINE_SOUND_VOLUME, sound.volume - engineVolumeDelta);
  }
}

function controlLander(frameTime) {
  const lander = level.lander;

  const isControllable = level.lander.fuel > 0;

  if (isControllable) {
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
  }
  adjustEngineSound(frameTime);
}

function moveLander(frameTime) {
  const lander = level.lander;

  controlLander(frameTime);


  lander.vy = lander.vy + level.g * frameTime;

  lander.x += lander.vx * frameTime;
  lander.y += lander.vy * frameTime;
  lander.angle = lander.angle + lander.rotation * frameTime;
}

function drawLander() {
  const lander = level.lander;
  const spriteX = lander.x;
  const spriteY = lander.y;

  ctx.translate(spriteX, spriteY);
  ctx.rotate(lander.angle);

  const zoomedWidth = lander.width / ZOOM;
  const zoomedHeight = lander.height / ZOOM;
  ctx.drawImage(lander.image, 0, 0, 32, 32,
    -(zoomedWidth / 2), -(zoomedHeight / 2),
    zoomedWidth, zoomedHeight);

  ctx.rotate(-lander.angle);
  ctx.translate(-spriteX, -spriteY);
}

function drawStats() {
  ctx.save();
  ctx.fillStyle = 'rgb(160, 160, 0)';
  ctx.fillRect(10, 10, level.lander.fuel / 6, 20);
  ctx.restore();

  // ctx.fillText(`vx: ${Math.round(level.lander.vx)}`, 20, 60);
}

function drawFrame() {
  ctx.fillStyle = 'rgb(150, 150, 150)';

  clearScreen('rgb( 30, 30, 100)');


  drawLandscape();
  drawStars();
  drawTrees();
  drawSparkles();
  drawLander();
  drawStats();
}

function isLandscapeHit() {
  const start = Math.round(level.lander.x - level.lander.width / 4);
  const finish = start + level.lander.width / 2;
  const shipBottom = level.lander.y + level.lander.height / 4;
  let hit = false;
  for (let x = start; x < finish; x = x + 1) {
    // setPixel(x, level.heightMap[x] - 1);
    if (shipBottom > level.heightMap[x]) {
      hit = true;
    }
  }

  if (hit) {
    level.lander.vy = -Math.abs(level.lander.vy);
  }

  return hit;
}

function isLanderOnPad() {
  const isOnPad = (level.lander.x - 8 > level.pad.start) &&
    (level.lander.x + 8 < level.pad.end);
  return isOnPad;
}
function checkCollision() {
  if (!isLandscapeHit()) {
    return;
  }

  if (
    Math.abs(level.lander.vy) < 10 &&
    Math.abs(level.lander.vx) < 10 &&
    isLanderOnPad() &&
    isLanderLookOnTop()
  ) {
    alert('YOU WIN!');
  } else {
    // alert('BOOM');
  }
  newGame();
}
function isLanderLookOnTop() {
  return getAngleDelta() < 0.03;
}

function nextFrame(timestamp) {
  // time passed from previous frame in seconds
  const dt = (timestamp - frameTimeStamp) / 1000;
  frameTimeStamp = timestamp;

  const isMainEngineOn = +!!buttons.ArrowUp;
  const isRotationEngineOn = +!!(buttons.ArrowLeft || buttons.ArrowRight);

  const fuelSpent = FUEL_CONSUMPTION_RATE * dt * isMainEngineOn;
  level.lander.fuel = level.lander.fuel - fuelSpent;

  if (level.lander.fuel < 0) {
    level.lander.fuel = 0;
  }

  moveLander(dt);

  doSparkles(dt);
  drawFrame(dt);

  checkCollision();

  requestAnimationFrame(nextFrame);
}

function initLanderResources() {
  level.lander.image.src = 'resources/spaceshipblack-32x32.png';

  level.lander.sound = new Audio('resources/rocket.mp3');
  level.lander.sound.loop = true;
  level.lander.sound.autoplay = true;
  level.lander.sound.volume = MIN_ENGINE_SOUND_VOLUME;
}

function initMusic() {
  level.music = new Audio('resources/landermusic.mp3');
  level.music.loop = true;
  level.music.autoplay = true;
  level.music.volume = INITIAL_MUSIC_VOLUME;
}

function newGame() {
  createLandscape(200);
  createStars(100);
  createTrees(10);
  level.lander = {
    ...level.lander,
    ...landerStart
  }
}

function main() {
  init(ZOOM);

  initLanderResources();
  initMusic();

  newGame();

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
