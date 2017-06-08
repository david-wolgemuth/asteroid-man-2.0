
import { Sound } from './sound';
import { randomRange } from '../random';

const AUDIO_PATH = 'audio';

export class AudioManager
{
  constructor ()
  {
    this.muted = true;
    this._soundBank = {};
  }
  loadSoundGroup (path, numberOfSounds, { volume=0, loop=false }={})
  {
    this._soundBank[path] = Array(numberOfSounds).map((value, index) => (
      new Sound(`${AUDIO_PATH}/${path}/${index}.mp3`, { volume, loop }
    )));
  }
  play (path, index=-1)
  {
    this._soundBank[path][
      (index === -1) ?
        randomRange(0, this._soundBank[path].length) :
        index
    ].play();
  }
}
