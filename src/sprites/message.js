
import { Text } from './text';
import { getCanvas } from '../canvas';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../window';

export class Message extends Text
{
  constructor (text)
  {
    const font = '96px Arial';
    const canvas = getCanvas();
    canvas.font = font;
    const width  = canvas.measureText(text).width;
    const x = (WINDOW_WIDTH - width) / 2;
    const y = (WINDOW_HEIGHT) / 2;
    super(x, y, text, { font });
  }
}