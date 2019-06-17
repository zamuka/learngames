import { init, line } from '../canvasLibrary.js';

function main() {
  // debugger;
  init(3);
  let i;
  const size = 34;
  for (i = 0; i < size; i = i + 1) {
    line(0, 150, 100, i * 4.6);
    line(200, 150, 100, i * 4.6);
    line(100, 0, i * 6, 150);
  }
}

window.onload = main;
