
import { Sprite } from './sprite';
import { GAME_SPEED, WINDOW_HEIGHT } from '../constants';

export class InteractiveSprite extends Sprite
{
  constructor (x, y=WINDOW_HEIGHT, width, height, scoreValue=0)
  {
    super(x, y, scoreValue);
    this.width = width;
    this.height = height;
  }
  update (player, speed=GAME_SPEED)
  {
    super.update();
    this.y -= speed;
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.collidedWithRect(this.player)) {
      this.collision();
    }
    return {
      scoreChange: this.reachedBottom() ? this.scoreValue : 0,
      destroy: this.shouldDestroy()
    };
  }
  render (x=this.x, y=this.y, width=this.width*-0.5, height=this.height*-0.5)
  {
    if (this.image) {
      if (this.rotation) {
        this._canvas.translate(
          x + width/2,
          y + height/2
        );
        this._canvas.rotate(this.rotation * Math.PI / 180);
      }
      this._canvas.drawImage(this.image, x, y, width, height);
    }
    this._canvas.restore();
  }
  shouldDestroy ()
  {
    return this.reachedBottom() || super.shouldDestroy();
  }
  reachedBottom ()
  {
    return this.y < (this.height * -3) || super.reachedBottom();
  }
  collidedWithRect (rect)
  {
    return false;
  }
}
