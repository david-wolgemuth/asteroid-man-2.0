
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './window';

export const CANVAS_ID = 'game-canvas';

CanvasRenderingContext2D.prototype.clear = function () {
  this.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
};

export const getCanvas = (id=CANVAS_ID) => (
  document.getElementById(id).getContext('2d')
);
