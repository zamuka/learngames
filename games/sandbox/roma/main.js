import { init, line } from '../canvasLibrary.js';

function main() {
  init();
  for (let i = 0; i <= 500; i = i + 25) {
    // line(0, i, i, 0);
    // line(500 - i, 500, 500, 500 - i);
    // line(500 - i, 500, 0, i);
    // line(500 - i, 0, 500, i);
    // line(0, i, i, 0);
    line(0 + i, 500, 500, 500 - i);
    line(500 + i, 500, 500, i);
    line(500 - i, 500, 500, 1000 - i);
    line(500 + i, 500, 500, 1000 - i);
  }
  for (let i = 0; i <= 100; i = i + 5) {
    line(0 + i, 100, 100, 100 - i);
    line(100 + i, 100, 100, i);
    line(100 - i, 100, 100, 200 - i);
    line(100 + i, 100, 100, 200 - i);
    line(900 + i, 100, 1000, 100 - i);
    line(1000 + i, 100, 1000, i);
    line(1100 - i, 100, 1000, 100 + i);
    line(900 + i, 100, 1000, 100 + i);
    line(0 + i, 900, 100, 900 - i);
    line(100 + i, 900, 100, 1000 - i);
    line(100 - i, 900, 100, 1000 - i);
    line(100 + i, 900, 100, 800 + i);
    line(1000 + i, 900, 1000, 800 + i);
    line(1000 - i, 900, 1000, 800 + i);
    line(1000 - i, 900, 1000, 1000 - i);
    line(1000 + i, 900, 1000, 1000 - i);
  }
}

window.onload = main;
