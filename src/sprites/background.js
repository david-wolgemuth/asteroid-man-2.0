import { Sprite } from './sprite';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../constants';
import { loadSpriteImages } from '../image-lib';

loadSpriteImages('starfield', 1);

export class Background extends Sprite
{
  constructor (id)
  {
    super(id, 0, WINDOW_WIDTH, WINDOW_HEIGHT, { y: 0, mobile: false, interactive: false, image: 'starfield' });
  }
  shouldDestroy ()
  {
    return super.shouldDestroy() && false;  // Should never destroy
  }
  render (canvas)
  {
    super.render(canvas, 0, 0, this.width, this.height);
  }
}