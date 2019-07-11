import {
  init, line, ctx, canvas, setPixel,
} from '../sandbox/canvasLibrary.js';

const heightMap = [];

function clearScreen(color) {
  ctx.save();

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);

  ctx.restore();
}

function drawLandscape(height) {
  let x = 0;
  let y = height;
  let vy = 0;
  let ay = 0;

  while (x < canvas.width) {
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

function main() {
  init(2);
  ctx.fillStyle = 'rgb(255, 255, 255)';

  clearScreen('rgb(0, 0, 0)');

  drawLandscape(200);

  console.log(heightMap);
  console.log(heightMap[200]);
}

window.onload = main;
