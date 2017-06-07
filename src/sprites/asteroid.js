
import { InteractiveSprite } from './interactive-sprite';
import { Explosion } from './explosion';
import { Debree } from './debree';
import { WINDOW_HEIGHT } from '../constants';
import { randomRange } from '../random';

export const ASTEROID_MAX_X = 2,
      ASTEROID_ROTATION_SPEED = 3,
      ASTEROID_CUSHION = 0.7;

export class Asteroid extends InteractiveSprite
{
  constructor (x, width)
  {
    super(x, width + WINDOW_HEIGHT, width, width);
    this.xVelocity = ASTEROID_MAX_X / randomRange(-10, 10);
    this.scoreValue = 1;
    this.rotation = randomRange(0, 360);
    this.spinSpeed = ASTEROID_ROTATION_SPEED / randomRange(-10, 10);
  }
  performCollision ()
  {
    super.collision();
    // Sounds.asteroid.random();  TODO
  }
  createExplosion ()
  {
    this.spawns = this.spawns.concat(
      [new Explosion(this.x, this.y, this.width * 2)]
    ).concat(
      Array(4).map(() => (
        new Debree(this.x, this.y)
      ))
    );
  }
  render ()
  {
    const c = this.width * ASTEROID_CUSHION;
    super.render(this.x-c, this.y-c, this.w + (c * 2), this.h + (c * 2));
  }
}
