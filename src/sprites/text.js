
import { Sprite } from './sprite';

export class Text extends Sprite
{
  constructor (x, y, text, { font='32px Arial', fillStyle='lightgray' }={})
  {
    super(x, 120, 120, { interactive: false, y, mobile: false });
    this.font = font;
    this.text = text;
    this.fillStyle = fillStyle;
  }
  render (canvas)
  {
    super.render(canvas);
    canvas.font = this.font;
    canvas.fillStyle = this.fillStyle;
    canvas.fillText(this.text, this.x, this.y);
  }
}
