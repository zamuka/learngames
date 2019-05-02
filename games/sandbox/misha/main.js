import { init, setPixel, line } from '../canvasLibrary.js';

function main() {
  init();
  line(10, 10, 100, 100);
}

window.onload = main;
