
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

const WIDTH = 20,
      HEIGHT = 40;

const image = 'falling-left';
loadSpriteImages(image, 1);

export class ExtraLife extends Sprite
{
  constructor (x)
  {
    super(x, WIDTH, HEIGHT, { image });
  }
  render (canvas)
  {
    super.render(canvas, this.x, this.y, this.width * 1.5, this.height);
  }
}
