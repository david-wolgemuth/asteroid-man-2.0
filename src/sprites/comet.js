
import { Sprite } from './sprite';
import { Explosion } from './explosion';
import { randomBool, randomRange } from '../random';

export const COMET_VELOCITY = -0.2,
      MIN_COMET_X_VELOCITY = 2,
      MAX_COMET_X_VELOCITY = 6;

export class Comet extends Sprite
{
  constructor (x, y, width)
  {
    super(x, y, width, width);
    this.scoreValue = 2;
    this.direction = randomBool(1) ? 1 : -1;
    this.xVelocity = 0;
    this.yVelocity = COMET_VELOCITY;
    this.maxXVelocity = randomRange(MIN_COMET_X_VELOCITY, MAX_COMET_X_VELOCITY);
  }
  update (player, speed)
  {
    if (Math.abs(this.xVelocity) >= this.maxXVelocity) {
      this.direction *= -1;
    }
    this.xVelocity += 0.1 * this.direction;
    this.rotation = this.xVelocity * 4;
    // this.imageIndex += 1;
    super.update(player, speed);
  }
  createExplosion ()
  {
    this.spawns.push(
      new Explosion(this.x, this.y, this.width * 2)
    );
  }
  render (canvas)
  {
      super.render(canvas, this.x - this.width * 1.5, this.y + (this.height / 2), this.width * 11.8 * 2.2, this.height * 2.2);  // What are these numbers?
  }
}
