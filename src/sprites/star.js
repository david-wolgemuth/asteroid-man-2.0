
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

const WIDTH = 3,
      HEIGHT = 3,
      VELOCITY = 2.8;

loadSpriteImages('star', 1);

export class Star extends Sprite
{
  constructor (x)
  {
    super(x, WIDTH, HEIGHT, { interactive: false, image: 'star' });
    this.yVelocity = VELOCITY;
  }
}
