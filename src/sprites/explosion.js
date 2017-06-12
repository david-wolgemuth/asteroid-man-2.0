
import { Sprite } from './sprite';

export class Explosion extends Sprite
{
  constructor (id, x, y, width)
  {
    super(id, x, width, width, { y });
  }
  shouldDestroy ()
  {
    return super.shouldDestroy() /* || this.imageIndex > # of images */
  }
}
