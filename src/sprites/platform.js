
import { Sprite } from './sprite';
import { randomRange } from '../random';
import { loadSpriteImages } from '../image-lib';

const PLATFORM_W = 5,
      MIN_PLATFORM_HEIGHT = 80,
      MAX_PLATFORM_HEIGHT = 320;

const image = 'platform';
loadSpriteImages(image, 14);

export class Platform extends Sprite
{
  constructor (x)
  {
    super(x, PLATFORM_W, randomRange(MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT), { image });
    this.imageIndex = randomRange(0, 14);
  }
  update (player, speed)
  {
    super.update(player, speed);
  }
}
