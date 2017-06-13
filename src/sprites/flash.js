import { Sprite } from './sprite';
import { WINDOW_WIDTH, WINDOW_HEIGHT} from '../window';

export class Flash extends Sprite
{
  constructor (color)
  {
    super(0, WINDOW_WIDTH, WINDOW_HEIGHT, { y: 0 });
    this._extend({ color });
  }
  render (canvas)
  {
    canvas.fillStyle = this.color;
    canvas.beginPath();
    canvas.rect(this.x, this.y, this.width, this.height);
    canvas.closePath(); 
    canvas.fill();
  }
}
