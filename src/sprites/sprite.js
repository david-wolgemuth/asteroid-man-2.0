
import { canvas } from 'canvas';

export class Sprite
{
  constructor (x, y, scoreValue = 0)
  {
    this.x = x;
    this.y = y;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.image = null;
    this.rotation = 0;
    this.scoreValue = scoreValue;
    this.spawns = [];

    this._canvas = canvas;
  }
  scoreChange ()
  {
    return this.reachedBottom() ? this.scoreValue : 0;
  }
  update ()
  {

  }
  collision ()
  {
    console.log('COLLISION');
  }
  shouldDestroy ()
  {
    return false;
  }
  reachedBottom ()
  {
    return false;
  }
  render ()
  {
      
  }
}
