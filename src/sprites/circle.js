
import { Sprite } from './sprite';
import { GAME_SPEED } from '../constants';

export class Circle extends Sprite
{
  constructor (x, y, radius)
  {
    super(x, y);
    this.radius = radius;
  }
  update (player, speed=GAME_SPEED)
  {
    super.update();
    this.y -= speed;
    this.specialUpdate();
    if (this.collidedWithRect(this.player)) {
      this.collision();
    }
  }
  shouldDestroy ()
  {
    return this.reachedBottom() || super.shouldDestroy();
  }
  reachedBottom ()
  {
    return this.y < (-3*this.r) || super.reachedBottom();
  }
  collidedWithRect (rect)
  {
    return false;
  }
}
