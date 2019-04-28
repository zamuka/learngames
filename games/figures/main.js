let canvas;
let ctx;

let halfWidth;
let halfHeight;

function setPixel(x, y) {
  // ctx.fillRect(x + halfWidth, halfHeight - y, 1, 1);
  ctx.fillRect(x, y, 1, 1);
}

function init() {
  canvas = document.getElementById('canvas');

  canvas.addEventListener('mousedown', (event) => {
    const x = event.x - halfWidth;
    const y = halfHeight - event.y;

    setPixel(x, y);
    console.log('x y', x, y);
  });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  halfWidth = Math.floor(canvas.width / 2);
  halfHeight = Math.floor(canvas.height / 2);
  ctx = canvas.getContext('2d');

  // initAxes();
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

function line(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const lengthX = Math.abs(dx);
  const lengthY = Math.abs(dy);

  let pixelCount = lengthX;

  if (lengthX < lengthY) {
    pixelCount = lengthY;
  }

  const stepX = dx / pixelCount;
  const stepY = dy / pixelCount;

  for (let i = 0; i <= pixelCount; i = i + 1) {
    const pointX = x1 + stepX * i;
    const pointY = y1 + stepY * i;

    setPixel(pointX, pointY);
  }
}

function drawPapaPixels(i) {
  setPixel(50, 50 + i);
  setPixel(150, 50 + i);
  setPixel(50 + i, 50);

  setPixel(200 + i / 2, 150 - i);
  setPixel(250 + i / 2, 50 + i);
  setPixel(225 + i / 2, 100);

  setPixel(350, 50 + i);
  setPixel(450, 50 + i);
  setPixel(350 + i, 50);

  setPixel(500 + i / 2, 150 - i);
  setPixel(550 + i / 2, 50 + i);
  setPixel(525 + i / 2, 100);
}

function drawRomaPixels(i) {
  setPixel(50, 200 + i);
  setPixel(50 + i / 2, 200);
  setPixel(100, 200 + i / 2);
  setPixel(50 + i / 2, 250);

  setPixel(150, 200 + i);
  setPixel(150 + i / 2, 200);
  setPixel(200, 200 + i);
  setPixel(150 + i / 2, 300);

  setPixel(250, 200 + i);
  setPixel(250 + i / 2, 200 + i);
  setPixel(350 - i / 2, 200 + i);
  setPixel(350, 200 + i);

  setPixel(400 + i / 2, 300 - i);
  setPixel(450 + i / 2, 200 + i);
  setPixel(425 + i / 2, 250);
}

function main() {
  init();

  for (let i = 0; i < 100; i = i + 1) {
    setTimeout(() => {
      drawPapaPixels(i);
      drawRomaPixels(i);
      // Word misha
      setPixel(50, 450 + i);
      setPixel(50 + i / 2, 450 + i);
      setPixel(100 + i / 2, 550 - i);
      setPixel(150, 450 + i);

      setPixel(200, 450 + i);
      setPixel(300 - i * 1, 450 + i);
      setPixel(300, 450 + i);

      setPixel(350, 450 + i);
      setPixel(450, 450 + i);
      setPixel(350 + i, 550);
      setPixel(400, 450 + i);

      setPixel(500 + i / 2, 550 - i);
      setPixel(550 + i / 2, 450 + i);
      setPixel(525 + i / 2, 500);

      const r = 12;
      const cx = 300;
      const cy = 300;

      const a = 2 * Math.PI * i / 100;

      const x = r * 2 * Math.cos(a);
      const y = r * 2 * Math.sin(a);

      setPixel(cx + x, cy + y);
    }, 20 * i);
  }
  // line(0, 0, 300, 300);
  // line(80, 500, 300, 300);
  for (let j = 0; j < 20; j = j + 1) {
    line(300, 300, Math.random() * 600, Math.random() * 600);
  }
}

window.onload = main;
