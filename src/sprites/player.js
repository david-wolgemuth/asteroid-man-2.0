
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

const WIDTH = 20,
      HEIGHT = 40,
      IMAGE_CYCLE_SPEED = 0.1,
      FALLING_IMAGES = 15,
      JUMPING_IMAGES = 9;

loadSpriteImages('falling-left', FALLING_IMAGES);
loadSpriteImages('falling-right', FALLING_IMAGES);
loadSpriteImages('jumping-left', JUMPING_IMAGES);
loadSpriteImages('jumping-right', JUMPING_IMAGES);

export class Player extends Sprite
{
  constructor (x, y)
  {
    super(x, WIDTH, HEIGHT, { y, image: 'falling-left', mobile: false });
  }
  cycleImage ()
  {
    if (this.image.indexOf('falling') >= 0) {
      this.imageIndex += IMAGE_CYCLE_SPEED;
      if (this.imageIndex >= FALLING_IMAGES) {
        this.imageIndex = 0;
      }
    }
    if (this.image.indexOf('jumping') >= 0) {
      if (this.imageIndex < JUMPING_IMAGES + IMAGE_CYCLE_SPEED) {
        this.imageIndex += IMAGE_CYCLE_SPEED;
      }
    }
  }
  render (canvas)
  {
    super.render(canvas, this.x, this.y, this.width * 1.5, this.height);
  }
}
