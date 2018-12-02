import { CELL_HEIGHT, CELL_WIDTH } from '../../config.js';

export default class GameField {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.fieldElement = document.getElementById('gamefield');
    this.fieldElement.style.width = width * CELL_WIDTH;
    this.fieldElement.style.height = height * CELL_HEIGHT;

    for (let col = 0; col < width; col += 1) {
      for (let row = 0; row < height; row += 1) {
        const cell = document.createElement('div');
        cell.id = `col${col}row${row}`;
        cell.style.top = row * CELL_HEIGHT;
        cell.style.height = CELL_HEIGHT;
        cell.style.left = col * CELL_WIDTH;
        cell.style.width = CELL_WIDTH;
        this.fieldElement.appendChild(cell);
      }
    }
  }

  getCellElement(x, y) {
    return this.fieldElement.querySelector(`#col${x}row${y}`);
  }

  getCell(x, y) {
    const cellElement = this.getCellElement(x, y);
    return cellElement && cellElement.className;
  }

  setCell(x, y, cellValue) {
    const cellElement = this.getCellElement(x, y);
    if (cellElement) {
      cellElement.className = cellValue;
    }
  }
}
