
import {
  Player, Asteroid, Coin, Comet, Fuel, Platform, ExtraLife, Background
} from './sprites';
import { getCanvas } from './canvas'; 
import { randomBool, randomRange } from './random';
import { requestAnimationFrame, cancelAnimationFrame } from './animation-frame';
import { 
  PLAYER_LAYER, BACKGROUND_LAYER, TEXT_LAYER, OBSTACLE_LAYER, PLATFORM_LAYER, FLASH_LAYER,
  ASTEROID_FREQUENCY, COIN_FREQUENCY, COMET_FREQUENCY, FUEL_FREQUENCY, PLATFORM_FREQUENCY, XLIFE_FREQUENCY,
  WINDOW_WIDTH, WINDOW_HEIGHT, COIN_VALUE, FUEL_VALUE
} from './constants';

export class Game
{
  constructor ()
  {
    this.player = new Player(WINDOW_WIDTH * 0.5, WINDOW_HEIGHT * 0.2);
    this.canvas = getCanvas();
    this.animationLoop = null;
    this.paused = true;
    this.score = 0;
    this.fuel  = 18;
    this.layers = [];
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
  touch ()
  {
    this.fuel = this.player.jump(this.layers[PLATFORM_LAYER], this.fuel);
  }
  _generateDefaultLayers ()
  {
    [
      BACKGROUND_LAYER, TEXT_LAYER, PLATFORM_LAYER, OBSTACLE_LAYER, PLAYER_LAYER, FLASH_LAYER
    ].forEach((layer) => {
      this.layers[layer] = [];
    });
    this.layers[BACKGROUND_LAYER].push(new Background());
    this.layers[PLAYER_LAYER].push(this.player);
  }
  _updateLayer (layer)
  {
    return layer.reduce((newLayer, sprite) => {  // Use reduce to filter out items, or add spawns
      const result = this._updateSprite(sprite);
      if (result instanceof Array) {
        return newLayer.concat(result);
      } else if (result) {
        return newLayer.concat([result]);
      } else {
        return newLayer;
      }
    }, []);
  }
  _updateSprite (sprite)
  {
    sprite.update();
    this.score += sprite.scoreChange();
    if (sprite.collidedWithSprite(this.player)) {
      return this._handleCollision(sprite);
    }
    if (sprite.constructor.name === 'Player') {
      return [sprite].concat(sprite.spawns);
    }
    this.score += sprite.scoreChange();
    return sprite.shouldDestroy() ? null : sprite;  // Return null if sprite should be destroyed
  }
  _handleCollision (sprite)
  {
    sprite.collision();
    switch (sprite.constructor.name) {
      case 'Coin':
        this.score += COIN_VALUE;
        break;        
      case 'Fuel':
        this.fuel += FUEL_VALUE;
        break;        
      case 'Asteroid':
        this.lives -= 1;
        break;        
      case 'Comet':
        this.lives -= 1;
        break;        
      case 'Platform':
        this.player.platformCollision(sprite);
        return sprite;
    }
    return sprite.spawns;
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
        this.layers[OBSTACLE_LAYER].push(new Class(x));
      }
    });
  }
  _generatePlatforms ()
  {
    if (randomBool(PLATFORM_FREQUENCY)) {
      let x = randomRange(0, WINDOW_WIDTH);
      this.layers[PLATFORM_LAYER].push(new Platform(x));
    }
  }
}
