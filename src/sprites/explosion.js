
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

const IMAGES = 6,
      IMAGE_CYCLE_SPEED = 0.1;

const image = 'explosion';
loadSpriteImages(image, IMAGES);

export class Explosion extends Sprite
{
  constructor (x, y, width)
  {
    super(x, width, width, { y, image, interactive: false });
  }
  cycleImage ()
  {
    this.imageIndex += IMAGE_CYCLE_SPEED;
    if (this.imageIndex >= IMAGES) {
      this.image = null;
    }
  }
  shouldDestroy ()
  {
    return super.shouldDestroy() || this.imageIndex >= IMAGES;
  }
}
