import { Sprite } from './sprite';
import { WINDOW_WIDTH, WINDOW_HEIGHT} from '../constants';

export class Flash extends Sprite
{
  constructor (id, color)
  {
    super(id, 0, WINDOW_WIDTH, WINDOW_HEIGHT, { y: 0 });
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