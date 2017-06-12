
import { Sprite } from './sprite';
import { randomRange, randomBool } from '../random';
import { loadSpriteImages } from '../image-lib';

export const DEBREE_W = 8,
             DEBREE_MAX_X = 4,
             DEBREE_ROTATION_SPEED = 7;

const image = 'asteroid';
loadSpriteImages(image, 1);

export class Debree extends Sprite
{
  constructor (x, y)
  {
    const width = randomRange(12, 24);
    super(x, width, width, { y, image });
    this.xVelocity = DEBREE_MAX_X / randomRange(10) * (randomBool(2) ? 1 : -1);
    this.yVelocity = DEBREE_MAX_X / randomRange(10) * (randomBool(2) ? 1 : -1);

    this.rotation = randomRange(0, 360);
    this.rotationSpeed = DEBREE_ROTATION_SPEED / randomRange(-10, 10);
  }
  update (player, speed)
  {
    this.rotation += this.rotationSpeed;
    super.update(player, speed);
  }
  render (canvas)
  {
    super.render(canvas);
  }
}
