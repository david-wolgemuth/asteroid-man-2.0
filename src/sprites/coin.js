
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

export const COIN_R = 25,
      COIN_SPIN_RATE = 0.1;

const image = 'coin';
loadSpriteImages(image, 6);

export class Coin extends Sprite
{
  constructor (x)
  {
    super(x, COIN_R, COIN_R, { image });
  }
  cycleImage ()
  {
    this.imageIndex += COIN_SPIN_RATE;
    if (this.imageIndex >= 6) {
      this.imageIndex = 0;
    }
  }
  update (player, speed)
  {
    // this.imageIndex += 1;  COIN_SPIN_RATE ...
    super.update(player, speed);
  }
}
