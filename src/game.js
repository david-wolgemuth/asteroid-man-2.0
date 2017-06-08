
import { Player, Asteroid, Coin, Comet, Fuel, Platform, ExtraLife } from './sprites';
import { getCanvas } from './canvas'; 
import { randomBool } from './random';
import { 
  PLAYER_LAYER, BACKGROUND_LAYER, TEXT_LAYER, OBSTACLE_LAYER, PLATFORM_LAYER,
  ASTEROID_FREQUENCY, COIN_FREQUENCY, COMET_FREQUENCY, FUEL_FREQUENCY, PLATFORM_FREQUENCY, XLIFE_FREQUENCY
} from './constants';

export class Game
{
  constructor ()
  {
    this.player = new Player();
    this.canvas = getCanvas();
    this.paused = true;
    this.score = 0;
    this.layers = [
      BACKGROUND_LAYER, TEXT_LAYER, PLATFORM_LAYER, OBSTACLE_LAYER, PLAYER_LAYER
    ].reduce(
      (layers, layer) => {
        layers[layer] = [];
        return layers;
      },
    []);
  }
  update ()
  {
    this._generateObstacles();
    this._generatePlatforms();
    this.layers = this.layers.map(this._updateLayer.bind(this));
  }
  render ()
  {
    this.layers.forEach(this._renderLayer.bind(this));
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
        this.layers[OBSTACLE_LAYER].push(new Class());
      }
    });
  }
  _generatePlatforms ()
  {
    if (randomBool(PLATFORM_FREQUENCY)) {
      this.layers[PLATFORM_LAYER].push(new Platform());
    }
  }
}
