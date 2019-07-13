import { init, line, setPixel } from '../canvasLibrary.js';


const STEP_COUNT = 5;

function bush(topx, topy, startx, starty, endx, endy) {
  const width = endx - startx;
  const height = endy - starty;

  const stepSizeX = width / STEP_COUNT;
  const stepSizeY = height / STEP_COUNT;
  console.log('startx', startx);
  console.log('stepSizeX', stepSizeX);

  for (let step = 0; step < STEP_COUNT; step += 1) {
    const pointx = startx + stepSizeX * step;
    const pointy = starty + stepSizeY * step;

    console.log('---------------------------');
    console.log('step', step);
    console.log('pointx', pointx);
    // console.log('pointy', pointy);
    // setPixel(pointx, pointy);
    line(topx, topy, pointx, pointy);
  }
}

function main() {
  init();

  const cx = 60;
  const cy = 70;

  const ax = 10;
  const ay = 100;
  const bx = 20;
  const by = 20;


  bush(cx, cy, ax, ay, bx, by);
  bush(ax, ay, bx, by, cx, cy);
  bush(bx, by, cx, cy, ax, ay);
}


window.onload = main;
