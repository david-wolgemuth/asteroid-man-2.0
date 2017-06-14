
import { Sprite } from './sprite';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../window';
import { Text } from './text';
import { Fuel } from './fuel';
import { Coin } from './coin';
import { Comet } from './comet';
import { ExtraLife } from './extra-life';

const TEXT_Y_OFFSET = 36,
      PADDING = 12,
      MARGIN = 12,
      EXTRA_LIFE_Y_OFFSET = 4,
      COIN_Y_OFFSET = 8,
      COMET_Y_OFFSET = 4;


export class HUD extends Sprite
{
  constructor ()
  {
    super(0, WINDOW_WIDTH, WINDOW_HEIGHT*0.1, { y: 0, mobile: false, interactive: false });
    this._createFuelDisplay();
    this._createLivesDisplay();
    this._createCoinsDisplay();
    this._createStageDisplay();
    this._createPauseDisplay();
  }
  update (speed=0)
  {
    super.update(speed);
    this.children.forEach(child => child.update(speed));
  }
  updateValues ({ canvas, fuel, lives, score, stage, paused })
  {
    canvas.font = this.fuelTextSprite.font;
    let x = 0;
    this._updateFuelDisplay(fuel);
    x = this.fuelTextSprite.x + canvas.measureText(this.fuelTextSprite.text).width + MARGIN;
    this._updateLivesDisplay(x, lives);
    x = this.extraLifeTextSprite.x + canvas.measureText(this.extraLifeTextSprite.text).width + MARGIN;
    this._updateCoinsDisplay(x, score);
    x = this.coinTextDisplay.x + canvas.measureText(this.coinTextDisplay.text).width + MARGIN;
    this._updateStageDisplay(x, stage);
    
    x = WINDOW_WIDTH - (canvas.measureText('❚❚').width + MARGIN + PADDING);
    this._updatePauseDisplay(x, paused);
  }
  _createFuelDisplay ()
  {
    this.fuelDisplaySprite = new Fuel(PADDING);
    this.fuelDisplaySprite._extend({ y: this.y+PADDING, interactive: false, mobile: false  });
    this.fuelDisplaySprite.width  *= 1.2;
    this.fuelDisplaySprite.height *= 1.2;
    this.children.push(this.fuelDisplaySprite);

    let x = this.fuelDisplaySprite.x + this.fuelDisplaySprite.width + MARGIN;
    this.fuelTextSprite = new Text(x, TEXT_Y_OFFSET + PADDING, '');
    this.children.push(this.fuelTextSprite);
  }
  _createLivesDisplay ()
  {
    this.extraLivesDisplaySprite = new ExtraLife(null /* SET WHEN UPDATED */);
    this.extraLivesDisplaySprite._extend({ y: this.y+PADDING+EXTRA_LIFE_Y_OFFSET, interactive: false, mobile: false });
    this.extraLivesDisplaySprite.width *= 1.2;
    this.extraLivesDisplaySprite.height *= 1.2;
    this.children.push(this.extraLivesDisplaySprite);

    this.extraLifeTextSprite = new Text(0, TEXT_Y_OFFSET + PADDING, '');
    this.children.push(this.extraLifeTextSprite);
  }
  _createCoinsDisplay ()
  {
    this.coinDisplaySprite = new Coin(null /* SET WHEN UPDATED */);
    this.coinDisplaySprite._extend({ y: this.y+COIN_Y_OFFSET+PADDING, interactive: false, mobile: false });
    this.coinDisplaySprite.width *= 1.2;
    this.coinDisplaySprite.height *= 1.2;
    this.children.push(this.coinDisplaySprite);

    this.coinTextDisplay = new Text(0, TEXT_Y_OFFSET+PADDING, '');
    this.children.push(this.coinTextDisplay);
  }
  _createStageDisplay ()
  {
    this.stageDisplaySprite = new Comet(null /* SET WHEN UPDATED */);
    this.stageDisplaySprite._extend({ y: this.y + COMET_Y_OFFSET + PADDING, interactive: false, mobile: false });
    this.children.push(this.stageDisplaySprite);
    
    this.stageTextSprite = new Text(0, TEXT_Y_OFFSET + PADDING, '');
    this.children.push(this.stageTextSprite);
  }
  _createPauseDisplay ()
  {
    this.pauseDisplaySprite = new Text(0, TEXT_Y_OFFSET + PADDING, '❚❚');
    this.children.push(this.pauseDisplaySprite);
  }
  _updateFuelDisplay(fuel)
  {
    this.fuelTextSprite.text = `x${fuel}`;
  }
  _updateLivesDisplay (x, lives)
  {
    this.extraLivesDisplaySprite.x = x;
    this.extraLifeTextSprite.x = this.extraLivesDisplaySprite.x + this.extraLivesDisplaySprite.width + MARGIN;
    this.extraLifeTextSprite.text = `x${lives}`;
  }
  _updateCoinsDisplay (x, coins)
  {
    this.coinDisplaySprite.x = x;
    this.coinTextDisplay.x = this.coinDisplaySprite.x + this.coinDisplaySprite.width + MARGIN;
    this.coinTextDisplay.text = `${coins}`;
  }
  _updateStageDisplay (x, stage)
  {
    this.stageDisplaySprite.x = x;
    this.stageTextSprite.x = this.stageDisplaySprite.x + this.stageDisplaySprite.width + MARGIN;
    this.stageTextSprite.text = `${stage}`;
  }
  _updatePauseDisplay (x, paused)
  {
    const text = paused ? '►' : '❚❚';
    this.pauseDisplaySprite.x = x;
    this.pauseDisplaySprite.text = text;
  }
}
