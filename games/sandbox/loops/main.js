import { init, line } from '../canvasLibrary.js';

function main() {
  // debugger;
  init(2);

  const pineWidth = 200;
  const pineHeight = 200;
  const pineLeft = 50;
  const pineTop = 50;
  const segmentCount = 6;
  const segmentHeight = pineHeight / segmentCount;
  const pineCenterX = pineLeft + pineWidth / 2;
  const pineRight = pineLeft + pineWidth;
  const pineBottom = pineTop + pineHeight;

  for (let segment = 0; segment < segmentCount; segment++) {
    const segmentTop = pineTop + segment * segmentHeight;
    const segmentBottom = segmentTop + segmentHeight;
    const segmentLeft = pineLeft + (segmentCount - segment) * pineWidth * 0.1;
    const segmentRight = pineRight - (segmentCount - segment) * pineWidth * 0.1;
    line(
      segmentLeft, segmentBottom,
      pineCenterX, segmentTop
      );
    line(
      pineCenterX, segmentTop,
      segmentRight, segmentBottom
    );
    line(segmentLeft, segmentBottom, segmentRight, segmentBottom);
  }

  const pineTrunkHeight = 30;
  const pineTrunkWidth = 15;
  for (let i = 0; i < 15; i++) {
    line(
      pineCenterX + i - pineTrunkWidth / 2, pineBottom,
      pineCenterX + i - pineTrunkWidth / 2, pineBottom + pineTrunkHeight)
  }

}

window.onload = main;
