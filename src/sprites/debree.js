
import { InteractiveSprite } from './interactive-sprite';
import { randomRange } from '../random';

export const DEBREE_W = 0,
             DEBREE_MAX_X = 4,
             DEBREE_ROTATION_SPEED = 7;

export class Debree extends InteractiveSprite
{
  constructor (x, y)
  {
    const width = DEBREE_W / randomRange(5, 10);
    super(x, y, width, width);
    this.xVelocity = DEBREE_MAX_X / randomRange(-10, 10);
    this.rotation = randomRange(0, 360);
    this.rotationSpeed = DEBREE_ROTATION_SPEED / randomRange(-10, 10);
  }
  update (player, speed)
  {
    this.rotation += this.rotationSpeed;
    super.update(player, speed);
  }
}
