
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';

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
}