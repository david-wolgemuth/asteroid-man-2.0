
import {
  Player, Asteroid, Coin, Comet, Fuel, Platform, ExtraLife, HUD, Message, Star
} from './sprites';
import { getCanvas } from './canvas'; 
import { randomBool, randomRange } from './random';
import { requestAnimationFrame, cancelAnimationFrame } from './animation-frame';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from './window';

const FUEL_FREQUENCY = 400,
      XLIFE_FREQUENCY = 800,
      COIN_FREQUENCY = 80,
      PLATFORM_FREQUENCY = 30,
      ASTEROID_FREQUENCY = 60,
      COMET_FREQUENCY = 80,
      STAR_FREQUENCY = 10;

const BACKGROUND_LAYER = 0,
      TEXT_LAYER = 1,
      PLATFORM_LAYER = 2,
      OBSTACLE_LAYER = 3,
      PLAYER_LAYER = 4;

const COIN_VALUE = 5,
      FUEL_VALUE = 9;

const STARTING_FUEL  = 20,
      STARTING_LIVES = 3;

const GAME_SPEED = 6,
      PAUSE_HEIGHT = 0.08,
      STAGE_SPEED_MULTIPLIER = 1.2,
      STAGE_1_ASTEROID_REQUIREMENT = 18,
      STAGE_ASTEROID_MULTIPLIER = 1.3;


export class Game
{
  constructor ()
  {
    this.player = new Player(WINDOW_WIDTH * 0.1, WINDOW_HEIGHT * 0.2);
    this.hud = new HUD();
    this.canvas = getCanvas();
    this.animationLoop = null;
    this.paused = false;
    this.shouldSendObjects = false;
    this.score = 0;
    this.fuel  = STARTING_FUEL;
    this.lives  = STARTING_LIVES;
    this.layers = [];
    this.speed = GAME_SPEED;
    this.gameover = false;
    this.asteroidsRequiredForStage = STAGE_1_ASTEROID_REQUIREMENT;
    this.asteroidsLeftThisStage = STAGE_1_ASTEROID_REQUIREMENT;
    this.stage = 1;
    this.reset = () => {};  // GETS SET LATER
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
    if (!this.paused && this.shouldSendObjects) {
      this._generateObstacles();
      this._generatePlatforms();
    }
    if (!this.paused) {
      this._generateStars();
      this.layers.forEach((layer, index) => {
        this.layers[index] = this._updateLayer(layer);
      });
    } else {
      this.layers[TEXT_LAYER] = this._updateLayer(this.layers[TEXT_LAYER]);
    }
    this.render();
  }
  render ()
  {
    this.canvas.clear();
    this.layers.forEach(this._renderLayer.bind(this));
  }
  touch (event)
  {
    event.preventDefault();
    if (this.gameover) {
      this.reset();
    }
    if (this.paused) {
      this.unpause();
      return;
    }
    const distanceFromTop = event.targetTouches[0].clientY / event.target.clientHeight;
    if (distanceFromTop < PAUSE_HEIGHT) {
      this.pause();
    } else {
      this.fuel = this.player.jump(this.layers[PLATFORM_LAYER], this.fuel);
    }
  }
  displayMessage (text, timeout=null, onFinished=null)
  {
    this.layers[TEXT_LAYER] = this.layers[TEXT_LAYER].filter(sprite => !(sprite instanceof Message));
    const message = new Message(text);
    this.layers[TEXT_LAYER].push(message);
    if (timeout === null) {
      return;
    }
    setTimeout(() => {
      message.destroyNextFrame = true;
      if (typeof(onFinished) === 'function') {
        onFinished();
      }
    }, timeout);
  }
  unpause ()
  {
    this.displayMessage('►', 500, () => {
      this.paused = false;  // Give 1/2 second buffer
      this.displayMessage('►', 1000);
    });
  }
  pause ()
  {
    this.displayMessage('❚❚', 1000);
    this.paused = true;
  }
  spread ()
  {
    for (let x = 0; x < 2400; x++) {
      this.update();
    }
  }
  _generateDefaultLayers ()
  {
    [
      BACKGROUND_LAYER, TEXT_LAYER, PLATFORM_LAYER, OBSTACLE_LAYER, PLAYER_LAYER
    ].forEach((layer) => {
      this.layers[layer] = [];
    });
    this.layers[PLAYER_LAYER].push(this.player);
    this.layers[TEXT_LAYER].push(this.hud);
  }
  _updateLayer (layer)
  {
    const newLayer = [];
    layer.forEach(sprite => {
      const result = this._updateSprite(sprite);
      if (!result) {
        return;
      }
      if (result instanceof Array) {
        result.forEach(spawn => {
          if (spawn.constructor.name === 'Flash') {
            this.layers[TEXT_LAYER].push(spawn);
          } else {
            newLayer.push(spawn);
          }
        });
      } else {
        newLayer.push(result);
      }
    });
    return newLayer;
  }
  _updateSprite (sprite)
  {
    sprite.update(this.speed);
    this.score += sprite.scoreChange();
    if (sprite.collidedWithSprite(this.player)) {
      return this._handleCollision(sprite);
    }
    if (sprite.constructor.name === 'Player') {
      return [sprite].concat(sprite.spawns);
    }
    if (sprite.constructor.name === 'HUD') {
      sprite.updateValues({
        canvas: this.canvas, fuel: this.fuel, lives: this.lives, score: this.score, stage: this.stage, paused: this.paused
      });
      return sprite;
    }
    this.score += sprite.scoreChange();
    if (sprite.shouldDestroy()) {
      if (sprite.constructor.name === 'Asteroid') {
        this._updateStageAsteroid();
      }
      return sprite.spawns;  // Don't return sprite
    }
    return sprite;
  }
  _handleCollision (sprite)
  {
    sprite.collision();
    switch (sprite.constructor.name) {
      case 'ExtraLife':
        this.lives += 1;
        break;
      case 'Coin':
        this.score += COIN_VALUE;
        break;        
      case 'Fuel':
        this.fuel += FUEL_VALUE;
        break;        
      case 'Asteroid':
        this._decrementLives();
        break;        
      case 'Comet':
        this._decrementLives();
        break;        
      case 'Platform':
        this.player.platformCollision(sprite);
        return sprite;
    }
    return sprite.spawns;
  }
  _updateStageAsteroid ()
  {
    this.asteroidsLeftThisStage -= 1;
    if (this.asteroidsLeftThisStage === 0) {
      this.stage += 1;
      this.shouldSendObjects = false;
      this.layers[OBSTACLE_LAYER].splice(0, this.layers[OBSTACLE_LAYER].length);
      this.displayMessage(`STAGE ${this.stage}`, 3000, () => {
        this.shouldSendObjects = true;
        this.asteroidsRequiredForStage *= STAGE_ASTEROID_MULTIPLIER;
        this.asteroidsLeftThisStage = Math.floor(this.asteroidsRequiredForStage);
        this.speed *= STAGE_SPEED_MULTIPLIER;
      });
    }
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
    ]
    .forEach(([frequency, Class]) => {
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
  _generateStars ()
  {
    if (randomBool(STAR_FREQUENCY)) {
      let x = randomRange(0, WINDOW_WIDTH);
      this.layers[BACKGROUND_LAYER].push(new Star(x));
    }
  }
  _decrementLives ()
  {
    if (this.lives === 0) {
      this.paused = true;
      this.gameover = true;
      this.displayMessage('GAME OVER');
    } else {
      this.lives -= 1;
    }
  }
}
