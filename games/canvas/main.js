let canvas;
let ctx;

let halfWidth;
let halfHeight;

function init() {
  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  halfWidth = Math.floor(canvas.width / 2);
  halfHeight = Math.floor(canvas.height / 2);
  ctx = canvas.getContext('2d');

  initAxes();
}

function setPixel(x, y) {
  ctx.fillRect(x + halfWidth, halfHeight - y, 1, 1);
}

function initAxes() {
  for (let x = -halfWidth; x < halfWidth; x = x + 1) {
    setPixel(x, 0);
    if (x % 100 === 0) {
      for (let i = -5; i < 5; i = i + 1) {
        setPixel(x, i);
      }
    }
  }

  for (let y = -halfHeight; y < halfHeight; y = y + 1) {
    setPixel(0, y);
    if (y % 100 === 0) {
      for (let i = -5; i < 5; i = i + 1) {
        setPixel(i, y);
      }
    }
  }
}

function drawFunction(fun, color) {
  ctx.fillStyle = color;
  for (let x = -halfWidth; x < halfWidth; x = x + 0.1) {
    const y = fun(x);
    setPixel(x, y);
  }
}

function xsquare(x) {
  const y = x * x / 100;
  return y;
}

function linear(x) {
  const y = x;
  return y;
}

function sin(x) {
  const y = Math.sin(x / 50) * 200;
  return y;
}

function line(x1, y1, x2, y2) {

}

function main() {
  init();


  // drawFunction(xsquare, 'red');

  // drawFunction(linear, 'green');
  // drawFunction(sin, 'blue');

  line(0, 0, 200, -100);
}


window.onload = main;
