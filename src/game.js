
import {
  Player, Asteroid, Coin, Comet, Fuel, Platform, ExtraLife, Background
} from './sprites';
import { getCanvas } from './canvas'; 
import { randomBool, randomRange } from './random';
import { requestAnimationFrame, cancelAnimationFrame } from './animation-frame';
import { 
  PLAYER_LAYER, BACKGROUND_LAYER, TEXT_LAYER, OBSTACLE_LAYER, PLATFORM_LAYER, FLASH_LAYER,
  ASTEROID_FREQUENCY, COIN_FREQUENCY, COMET_FREQUENCY, FUEL_FREQUENCY, PLATFORM_FREQUENCY, XLIFE_FREQUENCY,
  WINDOW_WIDTH
} from './constants';

export class Game
{
  constructor ()
  {
    this.player = new Player();
    this.canvas = getCanvas();
    this.animationLoop = null;
    this.paused = true;
    this.score = 0;
    this.layers = [];
    this._nextSpriteId = 1;
    this._generateDefaultLayers();
  }
  run ()
  {
    this.update();
    this.animationLoop = requestAnimationFrame(this.run.bind(this));
  }
  stop ()
  {
    cancelAnimationFrame(this.animationLoop);
  }
  update ()
  {
    this._generateObstacles();
    this._generatePlatforms();
    this.layers = this.layers.map(this._updateLayer.bind(this));
    this.render();
  }
  render ()
  {
    this.canvas.clear();
    this.layers.forEach(this._renderLayer.bind(this));
  }
  _generateDefaultLayers ()
  {
    [
      BACKGROUND_LAYER, TEXT_LAYER, PLATFORM_LAYER, OBSTACLE_LAYER, PLAYER_LAYER, FLASH_LAYER
    ].forEach((layer) => {
      this.layers[layer] = [];
    });
    this.layers[BACKGROUND_LAYER].push(new Background());
  }
  _updateLayer (layer)
  {
    return layer.reduce(
      (sprites, sprite) => 
        this._updateSprite(sprite) ?
          sprites :
          sprites.concat([sprite])
    , []);
  }
  _updateSprite (sprite)
  {
    sprite.update();
    this.score += sprite.scoreChange();
    if (this.player.collidedWithSprite(sprite)) {
      this.player.collision(sprite);
      sprite.collision(sprite);
    }
    return sprite.shouldDestroy();
  }
  _renderLayer (layer)
  {
    layer.forEach(sprite => sprite.render(this.canvas));
  }
  _generateObstacles ()
  {
    [
      [ASTEROID_FREQUENCY, Asteroid],
      [COIN_FREQUENCY, Coin],
      [COMET_FREQUENCY, Comet],
      [FUEL_FREQUENCY, Fuel],
      [XLIFE_FREQUENCY, ExtraLife]
    ].forEach(([frequency, Class]) => {
      if (randomBool(frequency)) {
        let x = randomRange(0, WINDOW_WIDTH);
        this.layers[OBSTACLE_LAYER].push(new Class(this._nextSpriteId++, x));
      }
    });
  }
  _generatePlatforms ()
  {
    if (randomBool(PLATFORM_FREQUENCY)) {
      let x = randomRange(0, WINDOW_WIDTH);
      this.layers[PLATFORM_LAYER].push(new Platform(this._nextSpriteId++, x));
    }
  }
}
