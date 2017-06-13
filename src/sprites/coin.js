
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';
import { Flash } from './flash';

const COIN_R = 25,
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
  collision ()
  {
    this.spawns.push(new Flash('gold'));
  }
  update (speed)
  {
    super.update(speed);
  }
}
