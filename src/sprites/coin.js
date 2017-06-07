
import { InteractiveSprite } from './interactive-sprite';
import { WINDOW_HEIGHT } from '../constants';

export const COIN_R = 25,
      COIN_SPIN_RATE = 0.1;

export class Coin extends InteractiveSprite
{
  constructor (x)
  {
    super(x, WINDOW_HEIGHT, COIN_R, COIN_R);
  }
  update (player, speed)
  {
    // this.imageIndex += 1;  COIN_SPIN_RATE ...
    super.update(player, speed);
  }
}
