
import { Sprite } from './sprite';
import { loadSpriteImages } from '../image-lib';
import { WINDOW_WIDTH } from '../window';
import { Jetpack } from './jetpack';

const WIDTH = 30,
      HEIGHT = 40,
      IMAGE_CYCLE_SPEED = 0.1,
      FALLING_IMAGES = 15,
      INITIAL_JUMP = 25,
      JUMPING_IMAGES = 6,
      JETPACK_SPEED = 0.8,
      DRIFT_SPEED = 0.1,
      JUMP_RANGE = 16,
      JUMP_SPEED = 3;

loadSpriteImages('falling-left', FALLING_IMAGES);
loadSpriteImages('falling-right', FALLING_IMAGES);
loadSpriteImages('jumping-left', JUMPING_IMAGES);
loadSpriteImages('jumping-right', JUMPING_IMAGES);

export class Player extends Sprite
{
  constructor (x, y)
  {
    super(x, WIDTH, HEIGHT, { y, image: 'falling-left', mobile: false });
    this.driftSpeed = DRIFT_SPEED;
    this.jumping = false;
  }
  platformCollision (platform)
  {
    if (this.xVelocity + this.driftSpeed > 0) {  // Player coming from left
      this.x = platform.x - (this.width + 1);
      if (Math.abs(this.xVel) > 0) {
        this.driftSpeed = DRIFT_SPEED * 4;  // BOUNCE OFF
      } else {
        this.driftSpeed = DRIFT_SPEED;
      }
    } else {  // Player on Right
      this.x = platform.x + (platform.width + 1);
      if (Math.abs(this.xVel) > 0) {
        this.driftSpeed = -DRIFT_SPEED * 4;
      } else {
        this.driftSpeed = -DRIFT_SPEED;
      }
    }
    this.image = this.image.replace('jumping', 'falling');  // Stop jump image
    this.xVelocity = 0;
  }
  jump (platforms, fuel)
  {
    // Return fuel
    const x = this.x;
    for (let platform of platforms) {
      this.x -= JUMP_RANGE;
      if (this.collidedWithSprite(platform)) {
        this._jump(JUMP_SPEED);
        return fuel;
      }
      this.x = x;  // RESET

      this.x += JUMP_RANGE;
      if (this.collidedWithSprite(platform)) {
        this._jump(-JUMP_SPEED);
        return fuel;
      }
      this.x = x;  // RESET
    }
    return this._jetpack(fuel);
  }
  cycleImage ()
  {
    if (this.image.indexOf('falling') >= 0) {
      this.imageIndex += IMAGE_CYCLE_SPEED;
      if (this.imageIndex >= FALLING_IMAGES) {
        this.imageIndex = 0;
      }
    }
    if (this.image.indexOf('jumping') >= 0) {
      // console.log(this.imageIndex, JUMPING_IMAGES, IMAGE_CYCLE_SPEED, JUMPING_IMAGES+IMAGE_CYCLE_SPEED);
      if (this.imageIndex < JUMPING_IMAGES - IMAGE_CYCLE_SPEED) {
        this.imageIndex += IMAGE_CYCLE_SPEED;
      } else {
        this.image = this.image.replace('jumping', 'falling');
        this.imageIndex = 0;
      }
    }
  }
  update (speed)
  {
    super.update(speed);
    this.x += this.driftSpeed + this.xVelocity;
    if (this.x > WINDOW_WIDTH) {
      this.x = (this.width*-0.5);
    }
    if (this.x < (this.width*-0.5)) {
      this.x = WINDOW_WIDTH + (this.width*-0.5);
    }
  }
  render (canvas)
  {
    super.render(canvas, this.x, this.y, this.width, this.height);
  }
  _jump (xVelocity)
  {
    this.xVelocity = xVelocity;
    this.imageIndex = 0;
    if (xVelocity > 0) {
      this.x += INITIAL_JUMP;
      this.image = 'jumping-right';
    } else {
      this.x -= INITIAL_JUMP;
      this.image = 'jumping-left';
    }
  }
  _jetpack (fuel)
  {
    this.imageIndex = 0;
    if (fuel <= 1) {
      return fuel;
    }
    if (this.image.indexOf('right') > 0) {
      this.xVelocity += JETPACK_SPEED;
      this._createJetpackSprite(this.x - this.width);
    } else {
      this.xVelocity -= JETPACK_SPEED;
      this._createJetpackSprite(this.x + this.width);
    }
    return fuel-2;
  }
  _createJetpackSprite (x)
  {
    this.spawns.push(new Jetpack(x, this.y));
  }
}
