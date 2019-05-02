let canvas;
let ctx;

function init() {
  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
}

function setPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
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

export {
  init,
  setPixel,
  ctx,
  line,
};
