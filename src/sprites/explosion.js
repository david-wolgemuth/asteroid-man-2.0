
import { Sprite } from './sprite';

export class Explosion extends Sprite
{
  constructor (x, y, width)
  {
    super(x, y, width, width);
  }
  shouldDestroy ()
  {
    return super.shouldDestroy() /* || this.imageIndex > # of images */
  }
}
