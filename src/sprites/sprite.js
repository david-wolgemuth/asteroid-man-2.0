
import { GAME_SPEED, WINDOW_HEIGHT } from '../constants';
import { getImage } from '../image-lib';

let UUID = 1;

export class Sprite
{
  constructor (x, width, height, { y=WINDOW_HEIGHT+height, scoreValue=0, mobile=true, image=null, interactive=true }={})
  {
    this._id = UUID++;
    if (this.constructor.name === 'Debree' || this.constructor.name === 'Explosion') {
      console.log(this._id, UUID);
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.xVelocity = 0;
    this.yVelocity = 0;
    this.rotation  = 0;
    this.rotationSpeed = 0;

    this.image = image;
    this.imageIndex = 0;
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
    this.rotation += this.rotationSpeed;
    if (typeof(this.cycleImage) === 'function') {
      this.cycleImage();
    }
  }
  render (canvas, x=this.x, y=this.y, width=this.width*-0.5, height=this.height*-0.5)
  {
    if (isNaN(this.x) || isNaN(this.y) || isNaN(width) || isNaN(height)) {
      console.error(this);
      throw `${this.constructor.name} Coordinates / Dimensions are NaN.`;
    }
    if (this.image) {
      let image = getImage(this.image, Math.floor(this.imageIndex));
      canvas.save();
      if (this.rotation) {
        canvas.translate(
          x + width/2,
          y + height/2
        );
        canvas.rotate(this.rotation * Math.PI / 180);
        canvas.drawImage(image, -width/2, -height/2, width, height); 
      } else {
        canvas.drawImage(image, x, y, width, height); 
      }
      canvas.restore();
    }
  }
  scoreChange ()
  {
    return this.reachedBottom() ? this.scoreValue : 0;
  }
  collision ()
  {
    // console.log(this.constructor.name, 'ID:', this.id, 'COLLISION');
  }
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
    return this.interactive && (this !== sprite) && !(
      // Rectangles Overlapping
      sprite.x > this.x + this.width    ||
      sprite.x + sprite.width < this.x  || 
      sprite.y > this.y + this.height   ||
      sprite.y + sprite.height < this.y
    );
  }
  _extend (object)
  {
    for (let key in object) {
      this[key] = object[key];
    }
  }
}
