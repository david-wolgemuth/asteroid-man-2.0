
import { InteractiveSprite } from './interactive-sprite';
import { WINDOW_HEIGHT, PLAYER_W, PLAYER_H } from '../constants';

export class ExtraLife extends InteractiveSprite
{
  constructor (x)
  {
    super(x, WINDOW_HEIGHT, PLAYER_W, PLAYER_H);
  }
  render ()
  {
    super.render(this.x, this.y, this.width * 1.5, this.height);
  }
}