
import { InteractiveSprite } from './interactive-sprite';
import { WINDOW_HEIGHT } from '../constants';

const FUEL_W = 20,
      FUEL_H = 40;

export class Fuel extends InteractiveSprite
{
  constructor (x)
  {
    super(x, WINDOW_HEIGHT, FUEL_W, FUEL_H);
    // this.image = fuel image
  }
}