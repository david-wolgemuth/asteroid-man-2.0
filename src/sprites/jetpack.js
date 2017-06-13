
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

const WIDTH = 40,
      HEIGHT = 30,
      IMAGE_CYCLE_SPEED = 0.05,
      IMAGE = 'explosion',
      NUMBER_OF_FRAMES = 6;
      // NUMBER_OF_FRAMES = 10;

loadSpriteImages(IMAGE, NUMBER_OF_FRAMES);

export class Jetpack extends Sprite
{
  constructor (x, y)
  {
    super(x, WIDTH, HEIGHT, { y, interactive: false, mobile: false, image: IMAGE });
  }
  cycleImage ()
  {
    this.imageIndex += IMAGE_CYCLE_SPEED;
    if (this.imageIndex >= NUMBER_OF_FRAMES) {
      this.image = null;
    }
  }
  shouldDestroy ()
  {
    return this.imageIndex >= NUMBER_OF_FRAMES;
  }
}
