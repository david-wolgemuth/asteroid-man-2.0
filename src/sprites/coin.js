
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

export const COIN_R = 25,
      COIN_SPIN_RATE = 0.1;

const image = 'coin';
loadSpriteImages(image, 6);

export class Coin extends Sprite
{
  constructor (id, x)
  {
    super(id, x, COIN_R, COIN_R, { image, imageCycle: { speed: COIN_SPIN_RATE, max: 6 } });
  }
  update (player, speed)
  {
    // this.imageIndex += 1;  COIN_SPIN_RATE ...
    super.update(player, speed);
  }
}
