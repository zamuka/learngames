import { init, line } from '../canvasLibrary.js';

function main() {
  init();
  let i;
  const size = 500;
  for (i = 0; i <= size; i = i + 25) {
    line(0, i, i, 0);
    line(i, size, size, i);
    line(size - i, 0, size, i);
    line(0, i, size - i, size);
  }
}

window.onload = main;
