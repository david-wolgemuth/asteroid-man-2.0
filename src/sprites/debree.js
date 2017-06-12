
import { Sprite } from './sprite';
import { randomRange, randomBool } from '../random';

export const DEBREE_W = 8,
             DEBREE_MAX_X = 4,
             DEBREE_ROTATION_SPEED = 7;

export class Debree extends Sprite
{
  constructor (id, x, y)
  {
    const width = randomRange(8, 18) * 0.1;
    super(id, x, width, width, { y });
    this.xVelocity = DEBREE_MAX_X / randomRange(10) * (randomBool(1) ? 1 : -1);
    this.rotation = randomRange(0, 360);
    this.rotationSpeed = DEBREE_ROTATION_SPEED / randomRange(-10, 10);
  }
  update (player, speed)
  {
    this.rotation += this.rotationSpeed;
    super.update(player, speed);
  }
}
