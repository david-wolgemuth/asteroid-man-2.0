
import { GAME_SPEED } from '../constants';

export class Sprite
{
  constructor (x, y, { scoreValue=0, mobile=true, image=null, interactive=true }={})
  {
    this.x = x;
    this.y = y;

    this.xVelocity = 0;
    this.yVelocity = 0;
    this.rotation  = 0;

    this.image = image;
    this.mobile = mobile;
    this.scoreValue = scoreValue;
    this.interactive = interactive;

    this.spawns = [];

    // this._canvas = canvas;
  }
  update (player, speed=GAME_SPEED)
  {
    if (this.mobile) {
      this.y -= speed;
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    }
  }
  render (canvas, x=this.x, y=this.y, width=this.width*-0.5, height=this.height*-0.5)
  {
    if (this.image) {
      if (this.rotation) {
        canvas.translate(
          x + width/2,
          y + height/2
        );
        canvas.rotate(this.rotation * Math.PI / 180);
      }
      canvas.drawImage(this.image, x, y, width, height);
    }
    canvas.restore();
  }
  scoreChange ()
  {
    return this.reachedBottom() ? this.scoreValue : 0;
  }
  collision () { /* To Be Overridden */ }
  shouldDestroy ()
  {
    return this.reachedBottom();
  }
  reachedBottom ()
  {
    return this.y < (this.height * -3);
  }
  collidedWithSprite (sprite)
  {
    return !(
      sprite.x > this.x + this.width    ||
      sprite.x + sprite.width < this.x  || 
      sprite.y > this.y + this.height   ||
      sprite.y + sprite.height < this.y
    ) && (this !== sprite);
  }
}
