
import { Sprite } from './sprite';

export class Text extends Sprite
{
  constructor (id, x, y, text, { font='32px Time-N-Space gold', fillStyle='white' }={})
  {
    super(id, x, { interactive: false });
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
