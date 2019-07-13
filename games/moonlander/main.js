import {
  init, line, ctx, canvas, setPixel,
} from '../sandbox/canvasLibrary.js';

const heightMap = [];
const ZOOM = 2;

function clearScreen(color) {
  ctx.save();

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, (canvas.width / ZOOM) - 1, (canvas.height / ZOOM) - 1);

  ctx.restore();
}

function drawLandscape(height) {
  let x = 0;
  let y = height;
  let vy = 0;
  let ay = 0;

  while (x < canvas.width / ZOOM) {
    setPixel(x, y);
    heightMap.push(Math.floor(y));

    x = x + 1;
    ay = Math.random() - 0.5 + 0.001 * (height - y);
    vy = vy + ay;
    if (vy > 1) vy = 1;
    if (vy < -1) vy = -1;
    y = y + vy;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addStar() {
  const x = getRandomInt(canvas.width / ZOOM);
  const y = getRandomInt(canvas.height / ZOOM);
  if (y < heightMap[x]) { setPixel(x, y); }
  console.log(x);
}

function main() {
  init(ZOOM);
  ctx.fillStyle = 'rgb(255, 255, 255)';

  clearScreen('rgb( 54, 49, 137)');

  drawLandscape(200);

  console.log(heightMap);
  console.log(heightMap[200]);

  for (let i = 0; i < 50; i = i + 1) {
    addStar();
  }
}


window.onload = main;
