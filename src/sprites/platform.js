
import { Sprite } from './sprite';
import { randomRange } from '../random';
import { WINDOW_HEIGHT } from '../constants';

const PLATFORM_W = 5,
      MIN_PLATFORM_HEIGHT = 80,
      MAX_PLATFORM_HEIGHT = 320;

export class Platform extends Sprite
{
  constructor (x)
  {
    super(x, WINDOW_HEIGHT, PLATFORM_W, randomRange(MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT));
    // this.image = random platform image
  }
  update (player, speed)
  {
    super.update(player, speed);
  }
}
