import { init, line } from '../canvasLibrary.js';

function main() {
  init();
  for (let i = 0; i <= 500; i = i + 25) {
    line(0, i, i, 0);
    line(500 - i, 500, 500, 500 - i);
    line(500 - i, 500, 0, i);
    line(500 - i, 0, 500, i);
  }
}

window.onload = main;
