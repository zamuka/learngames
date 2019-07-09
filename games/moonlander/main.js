import { init, line } from '../sandbox/canvasLibrary.js';

function main() {
  // debugger;
  init(2);
  line(10, 10, 200, 150);
}

window.onload = main;
