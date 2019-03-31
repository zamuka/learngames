let canvas;
let ctx;


function init() {
  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
}

function main() {
  init();
  ctx.fillRect(10, 10, 30, 30);
}


window.onload = main;
