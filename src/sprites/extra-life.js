
import { Sprite } from './sprite';
import { WINDOW_HEIGHT, PLAYER_W, PLAYER_H } from '../constants';

export class ExtraLife extends Sprite
{
  constructor (x)
  {
    super(x, WINDOW_HEIGHT, PLAYER_W, PLAYER_H);
  }
  render (canvas)
  {
    super.render(canvas, this.x, this.y, this.width * 1.5, this.height);
  }
}