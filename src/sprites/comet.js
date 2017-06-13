
import { Sprite } from './sprite';
import { Explosion } from './explosion';
import { randomBool, randomRange } from '../random';
import { loadSpriteImages } from '../image-lib';
import { Flash } from './flash';

const VELOCITY = 0,
      MIN_X_VELOCITY = 3,
      MAX_X_VELOCITY = 5,
      IMAGE_CYCLE_SPEED = 0.3,
      X_ACCELERATION = 0.1,
      MIN_WIDTH = 15,
      MAX_WIDTH = 25;

const image = 'comet';
loadSpriteImages(image, 5);

export class Comet extends Sprite
{
  constructor (x)
  {
    const width = randomRange(MIN_WIDTH, MAX_WIDTH);
    super(x, width, width, { image });
    this.scoreValue = 2;
    this.direction = randomBool(1) ? 1 : -1;
    this.xVelocity = 0;
    this.yVelocity = VELOCITY;
    this.maxXVelocity = randomRange(MIN_X_VELOCITY, MAX_X_VELOCITY);
  }
  update (player, speed)
  {
    if (Math.abs(this.xVelocity) >= this.maxXVelocity) {
      this.direction *= -1;
    }
    this.xVelocity += this.direction * X_ACCELERATION;
    this.rotation = 90 + this.xVelocity * this.maxXVelocity;
    super.update(player, speed);
  }
  cycleImage ()
  {
    this.imageIndex += IMAGE_CYCLE_SPEED;
    if (this.imageIndex >= 5) {
      this.imageIndex = 0;
    }
  }
  shouldDestroy ()
  {
    return this.reachedTop();
  }
  reachedTop ()
  {
    return this.y < (this.height*-3);
  }
  collision ()
  {
    this.createExplosion();
    this.spawns.push(new Flash('red'));
  }
  createExplosion ()
  {
    this.spawns.push(
      new Explosion(this.x, this.y, this.width * 2)
    );
  }
  render (canvas)
  {
      super.render(canvas, this.x - this.width * 1.5, this.y + (this.height / 2), this.width * 1.8 * 2.2, this.height * 2.2);  // What are these numbers?
  }
}
