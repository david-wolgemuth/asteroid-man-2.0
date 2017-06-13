
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';
import { Flash } from './flash';

const FUEL_W = 20,
      FUEL_H = 40;

const image = 'fuel';
loadSpriteImages(image, 1);

export class Fuel extends Sprite
{
  constructor (x)
  {
    super(x, FUEL_W, FUEL_H, { image });
  }
  collision ()
  {
    this.spawns.push(new Flash('brown'));
  }
}