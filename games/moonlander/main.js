import {
  init, line, ctx, canvas, setPixel,
} from '../sandbox/canvasLibrary.js';

const heightMap = [];
const ZOOM = 2;
let starCount = 0;

function clearScreen(color) {
  ctx.save();

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, (canvas.width / ZOOM) - 1, (canvas.height / ZOOM) - 1);

  ctx.restore();
}

function drawLandscape(height) {
  let x = 0;
  let y = height;
  let vy = 0;
  let ay = 0;


  while (x < canvas.width / ZOOM) {
    const MAX_SLOPE = 2;
    setPixel(x, y);
    heightMap.push(Math.floor(y));

    x = x + 1;
    ay = Math.random() - 0.5 + 0.001 * (height - y);
    vy = vy + ay;
    if (vy > MAX_SLOPE) vy = MAX_SLOPE;
    if (vy < -MAX_SLOPE) vy = -MAX_SLOPE;
    y = y + vy;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addStar() {
  const x = getRandomInt(canvas.width / ZOOM);
  const y = getRandomInt(canvas.height / ZOOM);
  if (y < heightMap[x]) {
    setPixel(x, y);
    starCount = starCount + 1;
  }
}

const drawStars = () => {
  ctx.save();
  ctx.fillStyle = 'rgb(255, 255, 255)';
  for (let i = 0; i < 100; i = i + 1) {
    addStar();
  }
  ctx.restore();
};

function main() {
  init(ZOOM);
  ctx.fillStyle = 'rgb(150, 150, 150)';

  clearScreen('rgb( 54, 49, 137)');

  drawLandscape(200);


  console.log(heightMap);
  console.log(heightMap[200]);

  // ctx.fillStyle = 'rgb(200, 200, 200)';

  // function drawPixelBelowGround(x) {
  //   setPixel(x, heightMap[x] + 1);
  // }

  const drawPixelBelowGround = (x) => {
    setPixel(x, heightMap[x] + 1);
  };

  let j = 0;
  while (j < heightMap.length) {
    drawPixelBelowGround(j);
    j = j + 1;
  }
  ctx.fillStyle = 'rgb(255, 255, 255)';
  const snowSpawnHeight = 160;
  for (let k = 0; k < heightMap.length; k = k + 1) {
    const y = heightMap[k] - 1;
    if (y < snowSpawnHeight) {
      setPixel(k, y);
    }
  }

  // heightMap.forEach((height, x) => setPixel(x, height + 1));
  drawStars();
  console.log('starCount :', starCount);
}


window.onload = main;
