
import { Sprite } from './sprite';
import { Explosion } from './explosion';
import { loadSpriteImages } from '../image-lib';
import { Debree } from './debree';
import { randomRange } from '../random';

export const ASTEROID_MAX_X = 2,
      ASTEROID_ROTATION_SPEED = 3,
      ASTEROID_CUSHION = 0.7,
      MIN_ASTEROID_R = 10,
      MAX_ASTEROID_R = 25;

const image = 'asteroid';
loadSpriteImages(image, 1);

export class Asteroid extends Sprite
{
  constructor (id, x)
  {
    const width = randomRange(MIN_ASTEROID_R, MAX_ASTEROID_R);
    super(id, x, width, width, { image });
    this.xVelocity = ASTEROID_MAX_X / randomRange(-15, 15);
    this.scoreValue = 1;
    this.rotation = randomRange(0, 360);
    this.rotationSpeed = ASTEROID_ROTATION_SPEED / randomRange(-10, 10);
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
  render (canvas)
  {
    const c = this.width * ASTEROID_CUSHION;
    super.render(canvas, this.x-c, this.y-c, this.width + (c * 2), this.height + (c * 2));
  }
}
