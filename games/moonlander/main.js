import {
  init, line, ctx, canvas, setPixel,
} from '../sandbox/canvasLibrary.js';

function clearScreen(color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
  ctx.restore();
}

function main() {
  init(2);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  clearScreen('rgb(0, 0, 0)');
}

window.onload = main;
