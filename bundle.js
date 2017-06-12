/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

var _imageLib = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = exports.Sprite = function () {
  function Sprite(x, y, width, height) {
    var _ref = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
        _ref$scoreValue = _ref.scoreValue,
        scoreValue = _ref$scoreValue === undefined ? 0 : _ref$scoreValue,
        _ref$mobile = _ref.mobile,
        mobile = _ref$mobile === undefined ? true : _ref$mobile,
        _ref$image = _ref.image,
        image = _ref$image === undefined ? null : _ref$image,
        _ref$interactive = _ref.interactive,
        interactive = _ref$interactive === undefined ? true : _ref$interactive;

    _classCallCheck(this, Sprite);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.xVelocity = 0;
    this.yVelocity = 0;
    this.rotation = 0;

    this.image = image;
    this.imageIndex = 0;
    this.mobile = mobile;
    this.scoreValue = scoreValue;
    this.interactive = interactive;

    this.spawns = [];

    // this._canvas = canvas;
  }

  _createClass(Sprite, [{
    key: 'update',
    value: function update(player) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.GAME_SPEED;

      if (this.mobile) {
        this.y -= speed;
        this.x += this.xVelocity;
        this.y += this.yVelocity;
      }
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.x;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.y;
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.width * -0.5;
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.height * -0.5;

      if (this.image) {
        var image = (0, _imageLib.getImage)(this.image, this.imageIndex);
        canvas.save();
        if (this.rotation) {
          canvas.translate(x + width / 2, y + height / 2);
          canvas.rotate(this.rotation * Math.PI / 180);
        }
        canvas.drawImage(image, x, y, width, height);
        canvas.restore();
      }
    }
  }, {
    key: 'scoreChange',
    value: function scoreChange() {
      return this.reachedBottom() ? this.scoreValue : 0;
    }
  }, {
    key: 'collision',
    value: function collision() {/* To Be Overridden */}
  }, {
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return this.reachedBottom();
    }
  }, {
    key: 'reachedBottom',
    value: function reachedBottom() {
      return this.y < this.height * -3;
    }
  }, {
    key: 'collidedWithSprite',
    value: function collidedWithSprite(sprite) {
      return !(sprite.x > this.x + this.width || sprite.x + sprite.width < this.x || sprite.y > this.y + this.height || sprite.y + sprite.height < this.y) && this !== sprite;
    }
  }, {
    key: '_extend',
    value: function _extend(object) {
      for (var key in object) {
        this[key] = object[key];
      }
    }
  }]);

  return Sprite;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

// Screen
var WINDOW_WIDTH = exports.WINDOW_WIDTH = 345,
    WINDOW_HEIGHT = exports.WINDOW_HEIGHT = 500,
    RATIO = exports.RATIO = WINDOW_WIDTH / WINDOW_HEIGHT;

// Layers

var BACKGROUND_LAYER = exports.BACKGROUND_LAYER = 0,
    TEXT_LAYER = exports.TEXT_LAYER = 1,
    PLATFORM_LAYER = exports.PLATFORM_LAYER = 2,
    OBSTACLE_LAYER = exports.OBSTACLE_LAYER = 3,
    PLAYER_LAYER = exports.PLAYER_LAYER = 4,
    FLASH_LAYER = exports.FLASH_LAYER = 5;

// Player
var FALLING_IMAGE_SWITCH = exports.FALLING_IMAGE_SWITCH = 0.1,
    PLAYER_W = exports.PLAYER_W = 20,
    PLAYER_H = exports.PLAYER_H = 40;

// Item Sizes and Ratios
var MIN_PLATFORM_HEIGHT = exports.MIN_PLATFORM_HEIGHT = 80,
    MAX_PLATFORM_HEIGHT = exports.MAX_PLATFORM_HEIGHT = 320,
    MIN_ASTEROID_R = exports.MIN_ASTEROID_R = 10,
    MAX_ASTEROID_R = exports.MAX_ASTEROID_R = 25,
    ASTEROID_CUSHION = exports.ASTEROID_CUSHION = 0.7,
    ASTEROID_ROTATION_SPEED = exports.ASTEROID_ROTATION_SPEED = 3,
    ASTEROID_MAX_X = exports.ASTEROID_MAX_X = 2,
    DEBREE_W = exports.DEBREE_W = 8,
    DEBREE_ROTATION_SPEED = exports.DEBREE_ROTATION_SPEED = 7,
    DEBREE_MAX_X = exports.DEBREE_MAX_X = 4,
    EXPLOSION_SPEED = exports.EXPLOSION_SPEED = 0.1,
    MIN_COMET_R = exports.MIN_COMET_R = 20,
    MAX_COMET_R = exports.MAX_COMET_R = 40,
    COMET_IMAGE_SPEED = exports.COMET_IMAGE_SPEED = 0.3,
    POSITION_SPACE = exports.POSITION_SPACE = 20,
    PLATFORM_W = exports.PLATFORM_W = 5,
    FUEL_W = exports.FUEL_W = 20,
    FUEL_H = exports.FUEL_H = 40,
    COIN_R = exports.COIN_R = 25,
    COIN_SPIN = exports.COIN_SPIN = 0.1,
    JETPACK_R = exports.JETPACK_R = 20;

// Contant Terms
var HIT_PLAYER = exports.HIT_PLAYER = 'hit-player',
    ASTEROID_PASSED = exports.ASTEROID_PASSED = 'asteroid-passed',
    COIN_COLLECTED = exports.COIN_COLLECTED = 'coin-collected',
    LIFE_COLLECTED = exports.LIFE_COLLECTED = 'life-collected',
    FUEL_COLLECTED = exports.FUEL_COLLECTED = 'fuel-collected';

var LEFT = exports.LEFT = false,
    RIGHT = exports.RIGHT = true;

// Frequencies
var FUEL_FREQUENCY = exports.FUEL_FREQUENCY = 400,
    XLIFE_FREQUENCY = exports.XLIFE_FREQUENCY = 800,
    COIN_FREQUENCY = exports.COIN_FREQUENCY = 80,
    PLATFORM_FREQUENCY = exports.PLATFORM_FREQUENCY = 70,
    ASTEROID_FREQUENCY = exports.ASTEROID_FREQUENCY = 120,
    COMET_FREQUENCY = exports.COMET_FREQUENCY = 200;

// Maximum Values
var MAX_FUEL = exports.MAX_FUEL = 30,
    MAX_LIVES = exports.MAX_LIVES = 5;

// GamePlay
var INITIAL_JUMP = exports.INITIAL_JUMP = 5,
    JUMP_RANGE = exports.JUMP_RANGE = 16,
    JETPACK_TIME = exports.JETPACK_TIME = 0.25,
    JETPACK_SPEED = exports.JETPACK_SPEED = 0.8,
    JUMP_SPEED = exports.JUMP_SPEED = 3,
    DRIFT_SPEED = exports.DRIFT_SPEED = 0.1,
    GAME_SPEED = exports.GAME_SPEED = 3;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var randomRange = exports.randomRange = function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomBool = exports.randomBool = function randomBool() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return randomRange(0, max) === 0;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var images = {};

var loadSpriteImages = exports.loadSpriteImages = function loadSpriteImages(imageName, numberOfFrames, imageLoaded) {
  return new Promise(function (resolve, reject) {
    console.log('going to load?');
    var loadedCount = 0;
    images[imageName] = [];
    var spriteImages = new Array(numberOfFrames).fill(null).map(function (value, index) {
      var image = new Image();
      images[imageName][index] = image;
      image.onload = function () {
        return finishedLoading(imageName, index);
      };
      image.onerror = reject;
      image.src = 'images/' + imageName + '/' + index + '.png';
      console.log('image', image);
    });
    var finishedLoading = function finishedLoading(imageName, index) {
      console.log(images[imageName][index]);
      if (typeof imageLoaded === 'function') {
        imageLoaded(imageName, index);
      }
      loadedCount += 1;
      if (loadedCount === numberOfFrames) {
        resolve(spriteImages);
      }
    };
  });
};

var getImage = exports.getImage = function getImage(imageName, index) {
  return images[imageName][index];
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explosion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explosion = exports.Explosion = function (_Sprite) {
  _inherits(Explosion, _Sprite);

  function Explosion(x, y, width) {
    _classCallCheck(this, Explosion);

    return _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, x, y, width, width));
  }

  _createClass(Explosion, [{
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return _get(Explosion.prototype.__proto__ || Object.getPrototypeOf(Explosion.prototype), 'shouldDestroy', this).call(this); /* || this.imageIndex > # of images */
    }
  }]);

  return Explosion;
}(_sprite.Sprite);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Debree = exports.DEBREE_ROTATION_SPEED = exports.DEBREE_MAX_X = exports.DEBREE_W = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _random = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBREE_W = exports.DEBREE_W = 0,
    DEBREE_MAX_X = exports.DEBREE_MAX_X = 4,
    DEBREE_ROTATION_SPEED = exports.DEBREE_ROTATION_SPEED = 7;

var Debree = exports.Debree = function (_Sprite) {
  _inherits(Debree, _Sprite);

  function Debree(x, y) {
    _classCallCheck(this, Debree);

    var width = DEBREE_W / (0, _random.randomRange)(5, 10);

    var _this = _possibleConstructorReturn(this, (Debree.__proto__ || Object.getPrototypeOf(Debree)).call(this, x, y, width, width));

    _this.xVelocity = DEBREE_MAX_X / (0, _random.randomRange)(-10, 10);
    _this.rotation = (0, _random.randomRange)(0, 360);
    _this.rotationSpeed = DEBREE_ROTATION_SPEED / (0, _random.randomRange)(-10, 10);
    return _this;
  }

  _createClass(Debree, [{
    key: 'update',
    value: function update(player, speed) {
      this.rotation += this.rotationSpeed;
      _get(Debree.prototype.__proto__ || Object.getPrototypeOf(Debree.prototype), 'update', this).call(this, player, speed);
    }
  }]);

  return Debree;
}(_sprite.Sprite);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprites = __webpack_require__(16);

var _canvas = __webpack_require__(8);

var _random = __webpack_require__(2);

var _animationFrame = __webpack_require__(7);

var _constants = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.player = new _sprites.Player();
    this.canvas = (0, _canvas.getCanvas)();
    this.animationLoop = null;
    this.paused = true;
    this.score = 0;
    this.layers = [];
    this._generateDefaultLayers();
  }

  _createClass(Game, [{
    key: 'run',
    value: function run() {
      this.update();
      this.animationLoop = (0, _animationFrame.requestAnimationFrame)(this.run.bind(this));
    }
  }, {
    key: 'stop',
    value: function stop() {
      (0, _animationFrame.cancelAnimationFrame)(this.animationLoop);
    }
  }, {
    key: 'update',
    value: function update() {
      console.log('hello');
      this._generateObstacles();
      this._generatePlatforms();
      this.layers = this.layers.map(this._updateLayer.bind(this));
      console.log(this.layers);
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.canvas.clear();
      this.layers.forEach(this._renderLayer.bind(this));
    }
  }, {
    key: '_generateDefaultLayers',
    value: function _generateDefaultLayers() {
      var _this = this;

      [_constants.BACKGROUND_LAYER, _constants.TEXT_LAYER, _constants.PLATFORM_LAYER, _constants.OBSTACLE_LAYER, _constants.PLAYER_LAYER, _constants.FLASH_LAYER].forEach(function (layer) {
        _this.layers[layer] = [];
      });
      this.layers[_constants.BACKGROUND_LAYER].push(new _sprites.Background());
    }
  }, {
    key: '_updateLayer',
    value: function _updateLayer(layer) {
      var _this2 = this;

      return layer.reduce(function (sprites, sprite) {
        return _this2._updateSprite(sprite) ? sprites : sprites.concat([sprite]);
      }, []);
    }
  }, {
    key: '_updateSprite',
    value: function _updateSprite(sprite) {
      sprite.update();
      this.score += sprite.scoreChange();
      if (this.player.collidedWithSprite(sprite)) {
        this.player.collision(sprite);
        sprite.collision(sprite);
      }
      return sprite.shouldDestroy();
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer(layer) {
      var _this3 = this;

      layer.forEach(function (sprite) {
        return sprite.render(_this3.canvas);
      });
    }
  }, {
    key: '_generateObstacles',
    value: function _generateObstacles() {
      var _this4 = this;

      [[_constants.ASTEROID_FREQUENCY, _sprites.Asteroid], [_constants.COIN_FREQUENCY, _sprites.Coin], [_constants.COMET_FREQUENCY, _sprites.Comet], [_constants.FUEL_FREQUENCY, _sprites.Fuel], [_constants.XLIFE_FREQUENCY, _sprites.ExtraLife]].forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            frequency = _ref2[0],
            Class = _ref2[1];

        if ((0, _random.randomBool)(frequency)) {
          _this4.layers[_constants.OBSTACLE_LAYER].push(new Class());
        }
      });
    }
  }, {
    key: '_generatePlatforms',
    value: function _generatePlatforms() {
      if ((0, _random.randomBool)(_constants.PLATFORM_FREQUENCY)) {
        this.layers[_constants.PLATFORM_LAYER].push(new _sprites.Platform());
      }
    }
  }]);

  return Game;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
                                  value: true
});

// https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame

var requestAnimationFrame = exports.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = exports.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvas = exports.CANVAS_ID = undefined;

var _constants = __webpack_require__(1);

var CANVAS_ID = exports.CANVAS_ID = 'game-canvas';

CanvasRenderingContext2D.prototype.clear = function () {
  this.clearRect(0, 0, _constants.WINDOW_WIDTH, _constants.WINDOW_HEIGHT);
};

var getCanvas = exports.getCanvas = function getCanvas() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CANVAS_ID;
  return document.getElementById(id).getContext('2d');
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(6);

var game = new _game.Game();
// setTimeout(function() {
game.run();
setTimeout(function () {
  game.stop();
}, 6000);
// }, 2000);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asteroid = exports.ASTEROID_CUSHION = exports.ASTEROID_ROTATION_SPEED = exports.ASTEROID_MAX_X = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _explosion = __webpack_require__(4);

var _imageLib = __webpack_require__(3);

var _debree = __webpack_require__(5);

var _constants = __webpack_require__(1);

var _random = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ASTEROID_MAX_X = exports.ASTEROID_MAX_X = 2,
    ASTEROID_ROTATION_SPEED = exports.ASTEROID_ROTATION_SPEED = 3,
    ASTEROID_CUSHION = exports.ASTEROID_CUSHION = 0.7;

(0, _imageLib.loadSpriteImages)('asteroid', 1);

var Asteroid = exports.Asteroid = function (_Sprite) {
  _inherits(Asteroid, _Sprite);

  function Asteroid(x, width) {
    _classCallCheck(this, Asteroid);

    var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, x, width + _constants.WINDOW_HEIGHT, width, width, { image: 'asteroid' }));

    _this.xVelocity = ASTEROID_MAX_X / (0, _random.randomRange)(-10, 10);
    _this.scoreValue = 1;
    _this.rotation = (0, _random.randomRange)(0, 360);
    _this.spinSpeed = ASTEROID_ROTATION_SPEED / (0, _random.randomRange)(-10, 10);
    return _this;
  }

  _createClass(Asteroid, [{
    key: 'performCollision',
    value: function performCollision() {
      _get(Asteroid.prototype.__proto__ || Object.getPrototypeOf(Asteroid.prototype), 'collision', this).call(this);
      // Sounds.asteroid.random();  TODO
    }
  }, {
    key: 'createExplosion',
    value: function createExplosion() {
      var _this2 = this;

      this.spawns = this.spawns.concat([new _explosion.Explosion(this.x, this.y, this.width * 2)]).concat(Array(4).map(function () {
        return new _debree.Debree(_this2.x, _this2.y);
      }));
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      var c = this.width * ASTEROID_CUSHION;
      _get(Asteroid.prototype.__proto__ || Object.getPrototypeOf(Asteroid.prototype), 'render', this).call(this, canvas, this.x - c, this.y - c, this.w + c * 2, this.h + c * 2);
    }
  }]);

  return Asteroid;
}(_sprite.Sprite);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Background = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _constants = __webpack_require__(1);

var _imageLib = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _imageLib.loadSpriteImages)('starfield', 1);

var Background = exports.Background = function (_Sprite) {
  _inherits(Background, _Sprite);

  function Background() {
    _classCallCheck(this, Background);

    return _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this, 0, 0, _constants.WINDOW_WIDTH, _constants.WINDOW_HEIGHT, { mobile: false, interactive: false, image: 'starfield' }));
  }

  _createClass(Background, [{
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return _get(Background.prototype.__proto__ || Object.getPrototypeOf(Background.prototype), 'shouldDestroy', this).call(this) && false; // Should never destroy
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      _get(Background.prototype.__proto__ || Object.getPrototypeOf(Background.prototype), 'render', this).call(this, canvas, 0, 0, this.width, this.height);
    }
  }]);

  return Background;
}(_sprite.Sprite);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coin = exports.COIN_SPIN_RATE = exports.COIN_R = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _constants = __webpack_require__(1);

var _imageLib = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COIN_R = exports.COIN_R = 25,
    COIN_SPIN_RATE = exports.COIN_SPIN_RATE = 0.1;

(0, _imageLib.loadSpriteImages)('coin', 6);

var Coin = exports.Coin = function (_Sprite) {
  _inherits(Coin, _Sprite);

  function Coin(x) {
    _classCallCheck(this, Coin);

    return _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, x, _constants.WINDOW_HEIGHT, COIN_R, COIN_R, { image: 'coin' }));
  }

  _createClass(Coin, [{
    key: 'update',
    value: function update(player, speed) {
      // this.imageIndex += 1;  COIN_SPIN_RATE ...
      _get(Coin.prototype.__proto__ || Object.getPrototypeOf(Coin.prototype), 'update', this).call(this, player, speed);
    }
  }]);

  return Coin;
}(_sprite.Sprite);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comet = exports.MAX_COMET_X_VELOCITY = exports.MIN_COMET_X_VELOCITY = exports.COMET_VELOCITY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _explosion = __webpack_require__(4);

var _random = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COMET_VELOCITY = exports.COMET_VELOCITY = -0.2,
    MIN_COMET_X_VELOCITY = exports.MIN_COMET_X_VELOCITY = 2,
    MAX_COMET_X_VELOCITY = exports.MAX_COMET_X_VELOCITY = 6;

var Comet = exports.Comet = function (_Sprite) {
  _inherits(Comet, _Sprite);

  function Comet(x, y, width) {
    _classCallCheck(this, Comet);

    var _this = _possibleConstructorReturn(this, (Comet.__proto__ || Object.getPrototypeOf(Comet)).call(this, x, y, width, width));

    _this.scoreValue = 2;
    _this.direction = (0, _random.randomBool)(1) ? 1 : -1;
    _this.xVelocity = 0;
    _this.yVelocity = COMET_VELOCITY;
    _this.maxXVelocity = (0, _random.randomRange)(MIN_COMET_X_VELOCITY, MAX_COMET_X_VELOCITY);
    return _this;
  }

  _createClass(Comet, [{
    key: 'update',
    value: function update(player, speed) {
      if (Math.abs(this.xVelocity) >= this.maxXVelocity) {
        this.direction *= -1;
      }
      this.xVelocity += 0.1 * this.direction;
      this.rotation = this.xVelocity * 4;
      // this.imageIndex += 1;
      _get(Comet.prototype.__proto__ || Object.getPrototypeOf(Comet.prototype), 'update', this).call(this, player, speed);
    }
  }, {
    key: 'createExplosion',
    value: function createExplosion() {
      this.spawns.push(new _explosion.Explosion(this.x, this.y, this.width * 2));
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      _get(Comet.prototype.__proto__ || Object.getPrototypeOf(Comet.prototype), 'render', this).call(this, canvas, this.x - this.width * 1.5, this.y + this.height / 2, this.width * 11.8 * 2.2, this.height * 2.2); // What are these numbers?
    }
  }]);

  return Comet;
}(_sprite.Sprite);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraLife = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _constants = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtraLife = exports.ExtraLife = function (_Sprite) {
  _inherits(ExtraLife, _Sprite);

  function ExtraLife(x) {
    _classCallCheck(this, ExtraLife);

    return _possibleConstructorReturn(this, (ExtraLife.__proto__ || Object.getPrototypeOf(ExtraLife)).call(this, x, _constants.WINDOW_HEIGHT, _constants.PLAYER_W, _constants.PLAYER_H));
  }

  _createClass(ExtraLife, [{
    key: 'render',
    value: function render(canvas) {
      _get(ExtraLife.prototype.__proto__ || Object.getPrototypeOf(ExtraLife.prototype), 'render', this).call(this, canvas, this.x, this.y, this.width * 1.5, this.height);
    }
  }]);

  return ExtraLife;
}(_sprite.Sprite);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fuel = undefined;

var _sprite = __webpack_require__(0);

var _constants = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FUEL_W = 20,
    FUEL_H = 40;

var Fuel = exports.Fuel = function (_Sprite) {
  _inherits(Fuel, _Sprite);

  function Fuel(x) {
    _classCallCheck(this, Fuel);

    return _possibleConstructorReturn(this, (Fuel.__proto__ || Object.getPrototypeOf(Fuel)).call(this, x, _constants.WINDOW_HEIGHT, FUEL_W, FUEL_H));
    // this.image = fuel image
  }

  return Fuel;
}(_sprite.Sprite);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asteroid = __webpack_require__(10);

Object.defineProperty(exports, 'Asteroid', {
  enumerable: true,
  get: function get() {
    return _asteroid.Asteroid;
  }
});

var _coin = __webpack_require__(12);

Object.defineProperty(exports, 'Coin', {
  enumerable: true,
  get: function get() {
    return _coin.Coin;
  }
});

var _comet = __webpack_require__(13);

Object.defineProperty(exports, 'Comet', {
  enumerable: true,
  get: function get() {
    return _comet.Comet;
  }
});

var _debree = __webpack_require__(5);

Object.defineProperty(exports, 'Debree', {
  enumerable: true,
  get: function get() {
    return _debree.Debree;
  }
});

var _explosion = __webpack_require__(4);

Object.defineProperty(exports, 'Explosion', {
  enumerable: true,
  get: function get() {
    return _explosion.Explosion;
  }
});

var _extraLife = __webpack_require__(14);

Object.defineProperty(exports, 'ExtraLife', {
  enumerable: true,
  get: function get() {
    return _extraLife.ExtraLife;
  }
});

var _fuel = __webpack_require__(15);

Object.defineProperty(exports, 'Fuel', {
  enumerable: true,
  get: function get() {
    return _fuel.Fuel;
  }
});

var _platform = __webpack_require__(17);

Object.defineProperty(exports, 'Platform', {
  enumerable: true,
  get: function get() {
    return _platform.Platform;
  }
});

var _text = __webpack_require__(19);

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _text.Text;
  }
});

var _background = __webpack_require__(11);

Object.defineProperty(exports, 'Background', {
  enumerable: true,
  get: function get() {
    return _background.Background;
  }
});

var _player = __webpack_require__(18);

Object.defineProperty(exports, 'Player', {
  enumerable: true,
  get: function get() {
    return _player.Player;
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _random = __webpack_require__(2);

var _constants = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLATFORM_W = 5,
    MIN_PLATFORM_HEIGHT = 80,
    MAX_PLATFORM_HEIGHT = 320;

var Platform = exports.Platform = function (_Sprite) {
  _inherits(Platform, _Sprite);

  function Platform(x) {
    _classCallCheck(this, Platform);

    return _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, x, _constants.WINDOW_HEIGHT, PLATFORM_W, (0, _random.randomRange)(MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT)));
    // this.image = random platform image
  }

  _createClass(Platform, [{
    key: 'update',
    value: function update(player, speed) {
      _get(Platform.prototype.__proto__ || Object.getPrototypeOf(Platform.prototype), 'update', this).call(this, player, speed);
    }
  }]);

  return Platform;
}(_sprite.Sprite);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _sprite = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = function (_Sprite) {
  _inherits(Player, _Sprite);

  function Player() {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
  }

  return Player;
}(_sprite.Sprite);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_Sprite) {
  _inherits(Text, _Sprite);

  function Text(x, y, text) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$font = _ref.font,
        font = _ref$font === undefined ? '32px Time-N-Space gold' : _ref$font,
        _ref$fillStyle = _ref.fillStyle,
        fillStyle = _ref$fillStyle === undefined ? 'white' : _ref$fillStyle;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, x, y, { interactive: false }));

    _this.font = font;
    _this.text = text;
    _this.fillStyle = fillStyle;
    return _this;
  }

  _createClass(Text, [{
    key: 'render',
    value: function render(canvas) {
      _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'render', this).call(this, canvas);
      canvas.font = this.font;
      canvas.fillStyle = this.fillStyle;
      canvas.fillText(this.text, this.x, this.y);
    }
  }]);

  return Text;
}(_sprite.Sprite);

/***/ })
/******/ ]);