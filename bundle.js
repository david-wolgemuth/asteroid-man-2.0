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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

var _window = __webpack_require__(2);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UUID = 1;

var Sprite = exports.Sprite = function () {
  function Sprite(x, width, height) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$y = _ref.y,
        y = _ref$y === undefined ? _window.WINDOW_HEIGHT + height : _ref$y,
        _ref$scoreValue = _ref.scoreValue,
        scoreValue = _ref$scoreValue === undefined ? 0 : _ref$scoreValue,
        _ref$mobile = _ref.mobile,
        mobile = _ref$mobile === undefined ? true : _ref$mobile,
        _ref$image = _ref.image,
        image = _ref$image === undefined ? null : _ref$image,
        _ref$interactive = _ref.interactive,
        interactive = _ref$interactive === undefined ? true : _ref$interactive;

    _classCallCheck(this, Sprite);

    this._id = UUID++;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.xVelocity = 0;
    this.yVelocity = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;

    this.image = image;
    this.imageIndex = 0;
    this.mobile = mobile;
    this.scoreValue = scoreValue;
    this.interactive = interactive;
    this.destroyNextFrame = false;

    this.spawns = [];
    this.children = [];
  }

  _createClass(Sprite, [{
    key: 'update',
    value: function update(speed) {
      if (this.mobile) {
        this.y -= speed;
        this.x += this.xVelocity;
        this.y += this.yVelocity;
      }
      this.rotation += this.rotationSpeed;
      if (typeof this.cycleImage === 'function') {
        this.cycleImage();
      }
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.x;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.y;
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.width;
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.height;

      if (isNaN(this.x) || isNaN(this.y) || isNaN(width) || isNaN(height)) {
        console.error(this);
        throw this.constructor.name + ' Coordinates / Dimensions are NaN.';
      }
      if (this.image) {
        var image = (0, _imageLib.getImage)(this.image, Math.floor(this.imageIndex));
        canvas.save();
        if (this.rotation) {
          canvas.translate(x + width / 2, y + height / 2);
          canvas.rotate(this.rotation * Math.PI / 180);
          canvas.drawImage(image, -width / 2, -height / 2, width, height);
        } else {
          canvas.drawImage(image, x, y, width, height);
        }
        canvas.restore();
      }
      this.children.forEach(function (child) {
        return child.render(canvas);
      });
    }
  }, {
    key: 'scoreChange',
    value: function scoreChange() {
      return this.reachedBottom() ? this.scoreValue : 0;
    }
  }, {
    key: 'collision',
    value: function collision() {
      // console.log(this.constructor.name, 'ID:', this.id, 'COLLISION');
    }
  }, {
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return this.reachedBottom() || this.destroyNextFrame;
    }
  }, {
    key: 'reachedBottom',
    value: function reachedBottom() {
      return this.y < this.height * -3;
    }
  }, {
    key: 'collidedWithSprite',
    value: function collidedWithSprite(sprite) {
      return this.interactive && this !== sprite && !(
      // Rectangles Overlapping
      sprite.x > this.x + this.width || sprite.x + sprite.width < this.x || sprite.y > this.y + this.height || sprite.y + sprite.height < this.y);
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

var images = {};

var loadSpriteImages = exports.loadSpriteImages = function loadSpriteImages(imageName, numberOfFrames, imageLoaded) {
  return new Promise(function (resolve, reject) {
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
    });
    var finishedLoading = function finishedLoading(imageName, index) {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
             value: true
});

// Screen
var WINDOW_WIDTH = exports.WINDOW_WIDTH = 621,
    WINDOW_HEIGHT = exports.WINDOW_HEIGHT = 1104;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var randomRange = exports.randomRange = function randomRange(min, max) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

var randomBool = exports.randomBool = function randomBool() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return randomRange(0, max) === 0;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flash = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _window = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flash = exports.Flash = function (_Sprite) {
  _inherits(Flash, _Sprite);

  function Flash(color) {
    _classCallCheck(this, Flash);

    var _this = _possibleConstructorReturn(this, (Flash.__proto__ || Object.getPrototypeOf(Flash)).call(this, 0, _window.WINDOW_WIDTH, _window.WINDOW_HEIGHT, { y: 0 }));

    _this._extend({ color: color });
    return _this;
  }

  _createClass(Flash, [{
    key: 'render',
    value: function render(canvas) {
      canvas.fillStyle = this.color;
      canvas.beginPath();
      canvas.rect(this.x, this.y, this.width, this.height);
      canvas.closePath();
      canvas.fill();
    }
  }]);

  return Flash;
}(_sprite.Sprite);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvas = exports.CANVAS_ID = undefined;

var _window = __webpack_require__(2);

var CANVAS_ID = exports.CANVAS_ID = 'game-canvas';

CanvasRenderingContext2D.prototype.clear = function () {
  this.clearRect(0, 0, _window.WINDOW_WIDTH, _window.WINDOW_HEIGHT);
};

var getCanvas = exports.getCanvas = function getCanvas() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CANVAS_ID;
  return document.getElementById(id).getContext('2d');
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explosion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IMAGES = 6,
    IMAGE_CYCLE_SPEED = 0.1;

var image = 'explosion';
(0, _imageLib.loadSpriteImages)(image, IMAGES);

var Explosion = exports.Explosion = function (_Sprite) {
  _inherits(Explosion, _Sprite);

  function Explosion(x, y, width) {
    _classCallCheck(this, Explosion);

    return _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, x, width, width, { y: y, image: image, interactive: false }));
  }

  _createClass(Explosion, [{
    key: 'cycleImage',
    value: function cycleImage() {
      this.imageIndex += IMAGE_CYCLE_SPEED;
      if (this.imageIndex >= IMAGES) {
        this.image = null;
      }
    }
  }, {
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return _get(Explosion.prototype.__proto__ || Object.getPrototypeOf(Explosion.prototype), 'shouldDestroy', this).call(this) || this.imageIndex >= IMAGES;
    }
  }]);

  return Explosion;
}(_sprite.Sprite);

/***/ }),
/* 7 */
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
        font = _ref$font === undefined ? '32px Arial' : _ref$font,
        _ref$fillStyle = _ref.fillStyle,
        fillStyle = _ref$fillStyle === undefined ? 'lightgray' : _ref$fillStyle;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, x, 120, 120, { interactive: false, y: y, mobile: false }));

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

var _flash = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COIN_R = 25,
    COIN_SPIN_RATE = 0.1;

var image = 'coin';
(0, _imageLib.loadSpriteImages)(image, 6);

var Coin = exports.Coin = function (_Sprite) {
  _inherits(Coin, _Sprite);

  function Coin(x) {
    _classCallCheck(this, Coin);

    return _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, x, COIN_R, COIN_R, { image: image }));
  }

  _createClass(Coin, [{
    key: 'cycleImage',
    value: function cycleImage() {
      this.imageIndex += COIN_SPIN_RATE;
      if (this.imageIndex >= 6) {
        this.imageIndex = 0;
      }
    }
  }, {
    key: 'collision',
    value: function collision() {
      this.spawns.push(new _flash.Flash('gold'));
    }
  }, {
    key: 'update',
    value: function update(speed) {
      _get(Coin.prototype.__proto__ || Object.getPrototypeOf(Coin.prototype), 'update', this).call(this, speed);
    }
  }]);

  return Coin;
}(_sprite.Sprite);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _explosion = __webpack_require__(6);

var _random = __webpack_require__(3);

var _imageLib = __webpack_require__(1);

var _flash = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VELOCITY = 0,
    MIN_X_VELOCITY = 3,
    MAX_X_VELOCITY = 5,
    IMAGE_CYCLE_SPEED = 0.3,
    X_ACCELERATION = 0.1,
    MIN_WIDTH = 15,
    MAX_WIDTH = 25;

var image = 'comet';
(0, _imageLib.loadSpriteImages)(image, 5);

var Comet = exports.Comet = function (_Sprite) {
  _inherits(Comet, _Sprite);

  function Comet(x) {
    _classCallCheck(this, Comet);

    var width = (0, _random.randomRange)(MIN_WIDTH, MAX_WIDTH);

    var _this = _possibleConstructorReturn(this, (Comet.__proto__ || Object.getPrototypeOf(Comet)).call(this, x, width, width, { image: image }));

    _this.scoreValue = 2;
    _this.direction = (0, _random.randomBool)(1) ? 1 : -1;
    _this.xVelocity = 0;
    _this.yVelocity = VELOCITY;
    _this.maxXVelocity = (0, _random.randomRange)(MIN_X_VELOCITY, MAX_X_VELOCITY);
    return _this;
  }

  _createClass(Comet, [{
    key: 'update',
    value: function update(speed) {
      _get(Comet.prototype.__proto__ || Object.getPrototypeOf(Comet.prototype), 'update', this).call(this, speed);
      if (Math.abs(this.xVelocity) >= this.maxXVelocity) {
        this.direction *= -1;
      }
      this.xVelocity += this.direction * X_ACCELERATION;
      this.rotation = 90 + this.xVelocity * this.maxXVelocity;
    }
  }, {
    key: 'cycleImage',
    value: function cycleImage() {
      this.imageIndex += IMAGE_CYCLE_SPEED;
      if (this.imageIndex >= 5) {
        this.imageIndex = 0;
      }
    }
  }, {
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return this.reachedTop();
    }
  }, {
    key: 'reachedTop',
    value: function reachedTop() {
      return this.y < this.height * -3;
    }
  }, {
    key: 'collision',
    value: function collision() {
      this.createExplosion();
      this.spawns.push(new _flash.Flash('red'));
    }
  }, {
    key: 'createExplosion',
    value: function createExplosion() {
      this.spawns.push(new _explosion.Explosion(this.x, this.y, this.width * 2));
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      _get(Comet.prototype.__proto__ || Object.getPrototypeOf(Comet.prototype), 'render', this).call(this, canvas, this.x - this.width * 1.5, this.y + this.height / 2, this.width * 1.8 * 2.2, this.height * 2.2); // What are these numbers?
    }
  }]);

  return Comet;
}(_sprite.Sprite);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Debree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _random = __webpack_require__(3);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBREE_W = 8,
    DEBREE_MAX_X = 4,
    DEBREE_ROTATION_SPEED = 7;

var image = 'asteroid';
(0, _imageLib.loadSpriteImages)(image, 1);

var Debree = exports.Debree = function (_Sprite) {
  _inherits(Debree, _Sprite);

  function Debree(x, y) {
    _classCallCheck(this, Debree);

    var width = (0, _random.randomRange)(12, 24);

    var _this = _possibleConstructorReturn(this, (Debree.__proto__ || Object.getPrototypeOf(Debree)).call(this, x, width, width, { y: y, image: image, interactive: false }));

    _this.xVelocity = DEBREE_MAX_X / (0, _random.randomRange)(10) * ((0, _random.randomBool)(2) ? 1 : -1);
    _this.yVelocity = DEBREE_MAX_X / (0, _random.randomRange)(10) * ((0, _random.randomBool)(2) ? 1 : -1);

    _this.rotation = (0, _random.randomRange)(0, 360);
    _this.rotationSpeed = DEBREE_ROTATION_SPEED / (0, _random.randomRange)(-10, 10);
    return _this;
  }

  _createClass(Debree, [{
    key: 'update',
    value: function update(speed) {
      _get(Debree.prototype.__proto__ || Object.getPrototypeOf(Debree.prototype), 'update', this).call(this, speed);
      this.rotation += this.rotationSpeed;
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      _get(Debree.prototype.__proto__ || Object.getPrototypeOf(Debree.prototype), 'render', this).call(this, canvas);
    }
  }]);

  return Debree;
}(_sprite.Sprite);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraLife = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

var _flash = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 30,
    HEIGHT = 40;

var image = 'falling-left';
(0, _imageLib.loadSpriteImages)(image, 1);

var ExtraLife = exports.ExtraLife = function (_Sprite) {
  _inherits(ExtraLife, _Sprite);

  function ExtraLife(x) {
    _classCallCheck(this, ExtraLife);

    return _possibleConstructorReturn(this, (ExtraLife.__proto__ || Object.getPrototypeOf(ExtraLife)).call(this, x, WIDTH, HEIGHT, { image: image }));
  }

  _createClass(ExtraLife, [{
    key: 'render',
    value: function render(canvas) {
      _get(ExtraLife.prototype.__proto__ || Object.getPrototypeOf(ExtraLife.prototype), 'render', this).call(this, canvas, this.x, this.y, this.width, this.height);
    }
  }, {
    key: 'collision',
    value: function collision() {
      this.spawns.push(new _flash.Flash('lightblue'));
    }
  }]);

  return ExtraLife;
}(_sprite.Sprite);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fuel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

var _flash = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FUEL_W = 20,
    FUEL_H = 40;

var image = 'fuel';
(0, _imageLib.loadSpriteImages)(image, 1);

var Fuel = exports.Fuel = function (_Sprite) {
  _inherits(Fuel, _Sprite);

  function Fuel(x) {
    _classCallCheck(this, Fuel);

    return _possibleConstructorReturn(this, (Fuel.__proto__ || Object.getPrototypeOf(Fuel)).call(this, x, FUEL_W, FUEL_H, { image: image }));
  }

  _createClass(Fuel, [{
    key: 'collision',
    value: function collision() {
      this.spawns.push(new _flash.Flash('brown'));
    }
  }]);

  return Fuel;
}(_sprite.Sprite);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprites = __webpack_require__(19);

var _canvas = __webpack_require__(5);

var _random = __webpack_require__(3);

var _animationFrame = __webpack_require__(14);

var _window = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FUEL_FREQUENCY = 400,
    XLIFE_FREQUENCY = 800,
    COIN_FREQUENCY = 80,
    PLATFORM_FREQUENCY = 30,
    ASTEROID_FREQUENCY = 60,
    COMET_FREQUENCY = 80,
    STAR_FREQUENCY = 10;

var BACKGROUND_LAYER = 0,
    TEXT_LAYER = 1,
    PLATFORM_LAYER = 2,
    OBSTACLE_LAYER = 3,
    PLAYER_LAYER = 4;

var COIN_VALUE = 5,
    FUEL_VALUE = 9;

var STARTING_FUEL = 20,
    STARTING_LIVES = 3;

var GAME_SPEED = 6,
    PAUSE_HEIGHT = 0.08,
    STAGE_SPEED_MULTIPLIER = 1.2,
    STAGE_1_ASTEROID_REQUIREMENT = 18,
    STAGE_ASTEROID_MULTIPLIER = 1.3;

var Game = exports.Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.player = new _sprites.Player(_window.WINDOW_WIDTH * 0.1, _window.WINDOW_HEIGHT * 0.2);
    this.hud = new _sprites.HUD();
    this.canvas = (0, _canvas.getCanvas)();
    this.animationLoop = null;
    this.paused = false;
    this.shouldSendObjects = false;
    this.score = 0;
    this.fuel = STARTING_FUEL;
    this.lives = STARTING_LIVES;
    this.layers = [];
    this.speed = GAME_SPEED;
    this.gameover = false;
    this.asteroidsRequiredForStage = STAGE_1_ASTEROID_REQUIREMENT;
    this.asteroidsLeftThisStage = STAGE_1_ASTEROID_REQUIREMENT;
    this.stage = 1;
    this.reset = function () {}; // GETS SET LATER
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
      var _this = this;

      if (!this.paused && this.shouldSendObjects) {
        this._generateObstacles();
        this._generatePlatforms();
      }
      if (!this.paused) {
        this._generateStars();
        this.layers.forEach(function (layer, index) {
          _this.layers[index] = _this._updateLayer(layer);
        });
      } else {
        this.layers[TEXT_LAYER] = this._updateLayer(this.layers[TEXT_LAYER]);
      }
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.canvas.clear();
      this.layers.forEach(this._renderLayer.bind(this));
    }
  }, {
    key: 'touch',
    value: function touch(event) {
      event.preventDefault();
      if (this.gameover) {
        this.reset();
      }
      if (this.paused) {
        this.unpause();
        return;
      }
      var distanceFromTop = event.targetTouches[0].clientY / event.target.clientHeight;
      if (distanceFromTop < PAUSE_HEIGHT) {
        this.pause();
      } else {
        this.fuel = this.player.jump(this.layers[PLATFORM_LAYER], this.fuel);
      }
    }
  }, {
    key: 'displayMessage',
    value: function displayMessage(text) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var onFinished = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.layers[TEXT_LAYER] = this.layers[TEXT_LAYER].filter(function (sprite) {
        return !(sprite instanceof _sprites.Message);
      });
      var message = new _sprites.Message(text);
      this.layers[TEXT_LAYER].push(message);
      if (timeout === null) {
        return;
      }
      setTimeout(function () {
        message.destroyNextFrame = true;
        if (typeof onFinished === 'function') {
          onFinished();
        }
      }, timeout);
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      var _this2 = this;

      this.displayMessage('►', 500, function () {
        _this2.paused = false; // Give 1/2 second buffer
        _this2.displayMessage('►', 1000);
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.displayMessage('❚❚', 1000);
      this.paused = true;
    }
  }, {
    key: 'spread',
    value: function spread() {
      for (var x = 0; x < 2400; x++) {
        this.update();
      }
    }
  }, {
    key: '_generateDefaultLayers',
    value: function _generateDefaultLayers() {
      var _this3 = this;

      [BACKGROUND_LAYER, TEXT_LAYER, PLATFORM_LAYER, OBSTACLE_LAYER, PLAYER_LAYER].forEach(function (layer) {
        _this3.layers[layer] = [];
      });
      this.layers[PLAYER_LAYER].push(this.player);
      this.layers[TEXT_LAYER].push(this.hud);
    }
  }, {
    key: '_updateLayer',
    value: function _updateLayer(layer) {
      var _this4 = this;

      var newLayer = [];
      layer.forEach(function (sprite) {
        var result = _this4._updateSprite(sprite);
        if (!result) {
          return;
        }
        if (result instanceof Array) {
          result.forEach(function (spawn) {
            if (spawn.constructor.name === 'Flash') {
              _this4.layers[TEXT_LAYER].push(spawn);
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
  }, {
    key: '_updateSprite',
    value: function _updateSprite(sprite) {
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
        return sprite.spawns; // Don't return sprite
      }
      return sprite;
    }
  }, {
    key: '_handleCollision',
    value: function _handleCollision(sprite) {
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
  }, {
    key: '_updateStageAsteroid',
    value: function _updateStageAsteroid() {
      var _this5 = this;

      this.asteroidsLeftThisStage -= 1;
      if (this.asteroidsLeftThisStage === 0) {
        this.stage += 1;
        this.shouldSendObjects = false;
        this.layers[OBSTACLE_LAYER].splice(0, this.layers[OBSTACLE_LAYER].length);
        this.displayMessage('STAGE ' + this.stage, 3000, function () {
          _this5.shouldSendObjects = true;
          _this5.asteroidsRequiredForStage *= STAGE_ASTEROID_MULTIPLIER;
          _this5.asteroidsLeftThisStage = Math.floor(_this5.asteroidsRequiredForStage);
          _this5.speed *= STAGE_SPEED_MULTIPLIER;
        });
      }
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer(layer) {
      var _this6 = this;

      layer.forEach(function (sprite) {
        return sprite.render(_this6.canvas);
      });
    }
  }, {
    key: '_generateObstacles',
    value: function _generateObstacles() {
      var _this7 = this;

      [[ASTEROID_FREQUENCY, _sprites.Asteroid], [COIN_FREQUENCY, _sprites.Coin], [COMET_FREQUENCY, _sprites.Comet], [FUEL_FREQUENCY, _sprites.Fuel], [XLIFE_FREQUENCY, _sprites.ExtraLife]].forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            frequency = _ref2[0],
            Class = _ref2[1];

        if ((0, _random.randomBool)(frequency)) {
          var x = (0, _random.randomRange)(0, _window.WINDOW_WIDTH);
          _this7.layers[OBSTACLE_LAYER].push(new Class(x));
        }
      });
    }
  }, {
    key: '_generatePlatforms',
    value: function _generatePlatforms() {
      if ((0, _random.randomBool)(PLATFORM_FREQUENCY)) {
        var x = (0, _random.randomRange)(0, _window.WINDOW_WIDTH);
        this.layers[PLATFORM_LAYER].push(new _sprites.Platform(x));
      }
    }
  }, {
    key: '_generateStars',
    value: function _generateStars() {
      if ((0, _random.randomBool)(STAR_FREQUENCY)) {
        var x = (0, _random.randomRange)(0, _window.WINDOW_WIDTH);
        this.layers[BACKGROUND_LAYER].push(new _sprites.Star(x));
      }
    }
  }, {
    key: '_decrementLives',
    value: function _decrementLives() {
      if (this.lives === 0) {
        this.paused = true;
        this.gameover = true;
        this.displayMessage('GAME OVER');
      } else {
        this.lives -= 1;
      }
    }
  }]);

  return Game;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
                                  value: true
});

// https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame

var requestAnimationFrame = exports.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = exports.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(13);

var _canvas = __webpack_require__(5);

var startNewGame = function startNewGame() {
  var game = new _game.Game();
  game.spread();
  game.shouldSendObjects = false;
  game.run();
  game.displayMessage('Ready', 1000, function () {
    game.displayMessage('Set', 1000, function () {
      game.shouldSendObjects = true;
      game.displayMessage('Go!', 2000);
    });
  });

  var canvas = document.getElementById(_canvas.CANVAS_ID);
  var touchstart = function touchstart(event) {
    if (game.gameover) {
      canvas.removeEventListener('touchstart', touchstart);
      startNewGame();
    } else {
      game.touch(event);
    }
  };
  canvas.addEventListener('touchstart', touchstart);
};

document.addEventListener('DOMContentLoaded', function () {
  startNewGame();
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asteroid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _explosion = __webpack_require__(6);

var _imageLib = __webpack_require__(1);

var _debree = __webpack_require__(10);

var _random = __webpack_require__(3);

var _flash = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ASTEROID_MAX_X = 2,
    ASTEROID_ROTATION_SPEED = 3,
    ASTEROID_CUSHION = 0.7,
    MIN_ASTEROID_R = 10,
    MAX_ASTEROID_R = 25;

var image = 'asteroid';
(0, _imageLib.loadSpriteImages)(image, 1);

var Asteroid = exports.Asteroid = function (_Sprite) {
  _inherits(Asteroid, _Sprite);

  function Asteroid(x) {
    _classCallCheck(this, Asteroid);

    var width = (0, _random.randomRange)(MIN_ASTEROID_R, MAX_ASTEROID_R);

    var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, x, width, width, { image: image }));

    _this.xVelocity = ASTEROID_MAX_X / (0, _random.randomRange)(-15, 15);
    _this.scoreValue = 1;
    _this.rotation = (0, _random.randomRange)(0, 360);
    _this.rotationSpeed = ASTEROID_ROTATION_SPEED / (0, _random.randomRange)(-10, 10);
    return _this;
  }

  _createClass(Asteroid, [{
    key: 'collision',
    value: function collision() {
      _get(Asteroid.prototype.__proto__ || Object.getPrototypeOf(Asteroid.prototype), 'collision', this).call(this);
      this.createExplosion();
      this.spawns.push(new _flash.Flash('red'));
    }
  }, {
    key: 'createExplosion',
    value: function createExplosion() {
      this.spawns.push(new _explosion.Explosion(this.x + this.width * 0.5, this.y + this.height * 0.5, this.width * 3));
      for (var x = 0; x < 4; x++) {
        this.spawns.push(new _debree.Debree(this.x, this.y));
      }
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      var c = this.width * ASTEROID_CUSHION;
      _get(Asteroid.prototype.__proto__ || Object.getPrototypeOf(Asteroid.prototype), 'render', this).call(this, canvas, this.x - c, this.y - c, this.width + c * 2, this.height + c * 2);
    }
  }]);

  return Asteroid;
}(_sprite.Sprite);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Background = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _window = __webpack_require__(2);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _imageLib.loadSpriteImages)('starfield', 1);

var Background = exports.Background = function (_Sprite) {
  _inherits(Background, _Sprite);

  function Background() {
    _classCallCheck(this, Background);

    return _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this, 0, _window.WINDOW_WIDTH, _window.WINDOW_HEIGHT, { y: 0, mobile: false, interactive: false, image: 'starfield' }));
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HUD = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _window = __webpack_require__(2);

var _text = __webpack_require__(7);

var _fuel = __webpack_require__(12);

var _coin = __webpack_require__(8);

var _comet = __webpack_require__(9);

var _extraLife = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEXT_Y_OFFSET = 36,
    PADDING = 12,
    MARGIN = 12,
    EXTRA_LIFE_Y_OFFSET = 4,
    COIN_Y_OFFSET = 8,
    COMET_Y_OFFSET = 4;

var HUD = exports.HUD = function (_Sprite) {
  _inherits(HUD, _Sprite);

  function HUD() {
    _classCallCheck(this, HUD);

    var _this = _possibleConstructorReturn(this, (HUD.__proto__ || Object.getPrototypeOf(HUD)).call(this, 0, _window.WINDOW_WIDTH, _window.WINDOW_HEIGHT * 0.1, { y: 0, mobile: false, interactive: false }));

    _this._createFuelDisplay();
    _this._createLivesDisplay();
    _this._createCoinsDisplay();
    _this._createStageDisplay();
    _this._createPauseDisplay();
    return _this;
  }

  _createClass(HUD, [{
    key: 'update',
    value: function update() {
      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _get(HUD.prototype.__proto__ || Object.getPrototypeOf(HUD.prototype), 'update', this).call(this, speed);
      this.children.forEach(function (child) {
        return child.update(speed);
      });
    }
  }, {
    key: 'updateValues',
    value: function updateValues(_ref) {
      var canvas = _ref.canvas,
          fuel = _ref.fuel,
          lives = _ref.lives,
          score = _ref.score,
          stage = _ref.stage,
          paused = _ref.paused;

      canvas.font = this.fuelTextSprite.font;
      var x = 0;
      this._updateFuelDisplay(fuel);
      x = this.fuelTextSprite.x + canvas.measureText(this.fuelTextSprite.text).width + MARGIN;
      this._updateLivesDisplay(x, lives);
      x = this.extraLifeTextSprite.x + canvas.measureText(this.extraLifeTextSprite.text).width + MARGIN;
      this._updateCoinsDisplay(x, score);
      x = this.coinTextDisplay.x + canvas.measureText(this.coinTextDisplay.text).width + MARGIN;
      this._updateStageDisplay(x, stage);

      x = _window.WINDOW_WIDTH - (canvas.measureText('❚❚').width + MARGIN + PADDING);
      this._updatePauseDisplay(x, paused);
    }
  }, {
    key: '_createFuelDisplay',
    value: function _createFuelDisplay() {
      this.fuelDisplaySprite = new _fuel.Fuel(PADDING);
      this.fuelDisplaySprite._extend({ y: this.y + PADDING, interactive: false, mobile: false });
      this.fuelDisplaySprite.width *= 1.2;
      this.fuelDisplaySprite.height *= 1.2;
      this.children.push(this.fuelDisplaySprite);

      var x = this.fuelDisplaySprite.x + this.fuelDisplaySprite.width + MARGIN;
      this.fuelTextSprite = new _text.Text(x, TEXT_Y_OFFSET + PADDING, '');
      this.children.push(this.fuelTextSprite);
    }
  }, {
    key: '_createLivesDisplay',
    value: function _createLivesDisplay() {
      this.extraLivesDisplaySprite = new _extraLife.ExtraLife(null /* SET WHEN UPDATED */);
      this.extraLivesDisplaySprite._extend({ y: this.y + PADDING + EXTRA_LIFE_Y_OFFSET, interactive: false, mobile: false });
      this.extraLivesDisplaySprite.width *= 1.2;
      this.extraLivesDisplaySprite.height *= 1.2;
      this.children.push(this.extraLivesDisplaySprite);

      this.extraLifeTextSprite = new _text.Text(0, TEXT_Y_OFFSET + PADDING, '');
      this.children.push(this.extraLifeTextSprite);
    }
  }, {
    key: '_createCoinsDisplay',
    value: function _createCoinsDisplay() {
      this.coinDisplaySprite = new _coin.Coin(null /* SET WHEN UPDATED */);
      this.coinDisplaySprite._extend({ y: this.y + COIN_Y_OFFSET + PADDING, interactive: false, mobile: false });
      this.coinDisplaySprite.width *= 1.2;
      this.coinDisplaySprite.height *= 1.2;
      this.children.push(this.coinDisplaySprite);

      this.coinTextDisplay = new _text.Text(0, TEXT_Y_OFFSET + PADDING, '');
      this.children.push(this.coinTextDisplay);
    }
  }, {
    key: '_createStageDisplay',
    value: function _createStageDisplay() {
      this.stageDisplaySprite = new _comet.Comet(null /* SET WHEN UPDATED */);
      this.stageDisplaySprite._extend({ y: this.y + COMET_Y_OFFSET + PADDING, interactive: false, mobile: false });
      this.children.push(this.stageDisplaySprite);

      this.stageTextSprite = new _text.Text(0, TEXT_Y_OFFSET + PADDING, '');
      this.children.push(this.stageTextSprite);
    }
  }, {
    key: '_createPauseDisplay',
    value: function _createPauseDisplay() {
      this.pauseDisplaySprite = new _text.Text(0, TEXT_Y_OFFSET + PADDING, '❚❚');
      this.children.push(this.pauseDisplaySprite);
    }
  }, {
    key: '_updateFuelDisplay',
    value: function _updateFuelDisplay(fuel) {
      this.fuelTextSprite.text = 'x' + fuel;
    }
  }, {
    key: '_updateLivesDisplay',
    value: function _updateLivesDisplay(x, lives) {
      this.extraLivesDisplaySprite.x = x;
      this.extraLifeTextSprite.x = this.extraLivesDisplaySprite.x + this.extraLivesDisplaySprite.width + MARGIN;
      this.extraLifeTextSprite.text = 'x' + lives;
    }
  }, {
    key: '_updateCoinsDisplay',
    value: function _updateCoinsDisplay(x, coins) {
      this.coinDisplaySprite.x = x;
      this.coinTextDisplay.x = this.coinDisplaySprite.x + this.coinDisplaySprite.width + MARGIN;
      this.coinTextDisplay.text = '' + coins;
    }
  }, {
    key: '_updateStageDisplay',
    value: function _updateStageDisplay(x, stage) {
      this.stageDisplaySprite.x = x;
      this.stageTextSprite.x = this.stageDisplaySprite.x + this.stageDisplaySprite.width + MARGIN;
      this.stageTextSprite.text = '' + stage;
    }
  }, {
    key: '_updatePauseDisplay',
    value: function _updatePauseDisplay(x, paused) {
      var text = paused ? '►' : '❚❚';
      this.pauseDisplaySprite.x = x;
      this.pauseDisplaySprite.text = text;
    }
  }]);

  return HUD;
}(_sprite.Sprite);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asteroid = __webpack_require__(16);

Object.defineProperty(exports, 'Asteroid', {
  enumerable: true,
  get: function get() {
    return _asteroid.Asteroid;
  }
});

var _coin = __webpack_require__(8);

Object.defineProperty(exports, 'Coin', {
  enumerable: true,
  get: function get() {
    return _coin.Coin;
  }
});

var _comet = __webpack_require__(9);

Object.defineProperty(exports, 'Comet', {
  enumerable: true,
  get: function get() {
    return _comet.Comet;
  }
});

var _debree = __webpack_require__(10);

Object.defineProperty(exports, 'Debree', {
  enumerable: true,
  get: function get() {
    return _debree.Debree;
  }
});

var _explosion = __webpack_require__(6);

Object.defineProperty(exports, 'Explosion', {
  enumerable: true,
  get: function get() {
    return _explosion.Explosion;
  }
});

var _extraLife = __webpack_require__(11);

Object.defineProperty(exports, 'ExtraLife', {
  enumerable: true,
  get: function get() {
    return _extraLife.ExtraLife;
  }
});

var _fuel = __webpack_require__(12);

Object.defineProperty(exports, 'Fuel', {
  enumerable: true,
  get: function get() {
    return _fuel.Fuel;
  }
});

var _platform = __webpack_require__(22);

Object.defineProperty(exports, 'Platform', {
  enumerable: true,
  get: function get() {
    return _platform.Platform;
  }
});

var _text = __webpack_require__(7);

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _text.Text;
  }
});

var _background = __webpack_require__(17);

Object.defineProperty(exports, 'Background', {
  enumerable: true,
  get: function get() {
    return _background.Background;
  }
});

var _player = __webpack_require__(23);

Object.defineProperty(exports, 'Player', {
  enumerable: true,
  get: function get() {
    return _player.Player;
  }
});

var _hud = __webpack_require__(18);

Object.defineProperty(exports, 'HUD', {
  enumerable: true,
  get: function get() {
    return _hud.HUD;
  }
});

var _message = __webpack_require__(21);

Object.defineProperty(exports, 'Message', {
  enumerable: true,
  get: function get() {
    return _message.Message;
  }
});

var _star = __webpack_require__(24);

Object.defineProperty(exports, 'Star', {
  enumerable: true,
  get: function get() {
    return _star.Star;
  }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jetpack = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 40,
    HEIGHT = 30,
    IMAGE_CYCLE_SPEED = 0.05,
    IMAGE = 'explosion',
    NUMBER_OF_FRAMES = 6;
// NUMBER_OF_FRAMES = 10;

(0, _imageLib.loadSpriteImages)(IMAGE, NUMBER_OF_FRAMES);

var Jetpack = exports.Jetpack = function (_Sprite) {
  _inherits(Jetpack, _Sprite);

  function Jetpack(x, y) {
    _classCallCheck(this, Jetpack);

    return _possibleConstructorReturn(this, (Jetpack.__proto__ || Object.getPrototypeOf(Jetpack)).call(this, x, WIDTH, HEIGHT, { y: y, interactive: false, mobile: false, image: IMAGE }));
  }

  _createClass(Jetpack, [{
    key: 'cycleImage',
    value: function cycleImage() {
      this.imageIndex += IMAGE_CYCLE_SPEED;
      if (this.imageIndex >= NUMBER_OF_FRAMES) {
        this.image = null;
      }
    }
  }, {
    key: 'shouldDestroy',
    value: function shouldDestroy() {
      return this.imageIndex >= NUMBER_OF_FRAMES;
    }
  }]);

  return Jetpack;
}(_sprite.Sprite);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = undefined;

var _text = __webpack_require__(7);

var _canvas = __webpack_require__(5);

var _window = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = exports.Message = function (_Text) {
  _inherits(Message, _Text);

  function Message(text) {
    _classCallCheck(this, Message);

    var font = '96px Arial';
    var canvas = (0, _canvas.getCanvas)();
    canvas.font = font;
    var width = canvas.measureText(text).width;
    var x = (_window.WINDOW_WIDTH - width) / 2;
    var y = _window.WINDOW_HEIGHT / 2;
    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, x, y, text, { font: font }));
  }

  return Message;
}(_text.Text);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _random = __webpack_require__(3);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLATFORM_W = 5,
    MIN_PLATFORM_HEIGHT = 80,
    MAX_PLATFORM_HEIGHT = 320;

var image = 'platform';
(0, _imageLib.loadSpriteImages)(image, 14);

var Platform = exports.Platform = function (_Sprite) {
  _inherits(Platform, _Sprite);

  function Platform(x) {
    _classCallCheck(this, Platform);

    var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, x, PLATFORM_W, (0, _random.randomRange)(MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT), { image: image }));

    _this.imageIndex = (0, _random.randomRange)(0, 14);
    return _this;
  }

  _createClass(Platform, [{
    key: 'update',
    value: function update(speed) {
      _get(Platform.prototype.__proto__ || Object.getPrototypeOf(Platform.prototype), 'update', this).call(this, speed);
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      _get(Platform.prototype.__proto__ || Object.getPrototypeOf(Platform.prototype), 'render', this).call(this, canvas, this.x, this.y, this.width, this.height);
    }
  }]);

  return Platform;
}(_sprite.Sprite);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

var _window = __webpack_require__(2);

var _jetpack2 = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 30,
    HEIGHT = 40,
    IMAGE_CYCLE_SPEED = 0.1,
    FALLING_IMAGES = 15,
    INITIAL_JUMP = 25,
    JUMPING_IMAGES = 6,
    JETPACK_SPEED = 0.8,
    DRIFT_SPEED = 0.1,
    JUMP_RANGE = 16,
    JUMP_SPEED = 3;

(0, _imageLib.loadSpriteImages)('falling-left', FALLING_IMAGES);
(0, _imageLib.loadSpriteImages)('falling-right', FALLING_IMAGES);
(0, _imageLib.loadSpriteImages)('jumping-left', JUMPING_IMAGES);
(0, _imageLib.loadSpriteImages)('jumping-right', JUMPING_IMAGES);

var Player = exports.Player = function (_Sprite) {
  _inherits(Player, _Sprite);

  function Player(x, y) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, WIDTH, HEIGHT, { y: y, image: 'falling-left', mobile: false }));

    _this.driftSpeed = DRIFT_SPEED;
    _this.jumping = false;
    return _this;
  }

  _createClass(Player, [{
    key: 'platformCollision',
    value: function platformCollision(platform) {
      if (this.xVelocity + this.driftSpeed > 0) {
        // Player coming from left
        this.x = platform.x - (this.width + 1);
        if (Math.abs(this.xVel) > 0) {
          this.driftSpeed = DRIFT_SPEED * 4; // BOUNCE OFF
        } else {
          this.driftSpeed = DRIFT_SPEED;
        }
      } else {
        // Player on Right
        this.x = platform.x + (platform.width + 1);
        if (Math.abs(this.xVel) > 0) {
          this.driftSpeed = -DRIFT_SPEED * 4;
        } else {
          this.driftSpeed = -DRIFT_SPEED;
        }
      }
      this.image = this.image.replace('jumping', 'falling'); // Stop jump image
      this.xVelocity = 0;
    }
  }, {
    key: 'jump',
    value: function jump(platforms, fuel) {
      // Return fuel
      var x = this.x;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var platform = _step.value;

          this.x -= JUMP_RANGE;
          if (this.collidedWithSprite(platform)) {
            this._jump(JUMP_SPEED);
            return fuel;
          }
          this.x = x; // RESET

          this.x += JUMP_RANGE;
          if (this.collidedWithSprite(platform)) {
            this._jump(-JUMP_SPEED);
            return fuel;
          }
          this.x = x; // RESET
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this._jetpack(fuel);
    }
  }, {
    key: 'cycleImage',
    value: function cycleImage() {
      if (this.image.indexOf('falling') >= 0) {
        this.imageIndex += IMAGE_CYCLE_SPEED;
        if (this.imageIndex >= FALLING_IMAGES) {
          this.imageIndex = 0;
        }
      }
      if (this.image.indexOf('jumping') >= 0) {
        // console.log(this.imageIndex, JUMPING_IMAGES, IMAGE_CYCLE_SPEED, JUMPING_IMAGES+IMAGE_CYCLE_SPEED);
        if (this.imageIndex < JUMPING_IMAGES - IMAGE_CYCLE_SPEED) {
          this.imageIndex += IMAGE_CYCLE_SPEED;
        } else {
          this.image = this.image.replace('jumping', 'falling');
          this.imageIndex = 0;
        }
      }
    }
  }, {
    key: 'update',
    value: function update(speed) {
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'update', this).call(this, speed);
      this.x += this.driftSpeed + this.xVelocity;
      if (this.x > _window.WINDOW_WIDTH) {
        this.x = this.width * -0.5;
      }
      if (this.x < this.width * -0.5) {
        this.x = _window.WINDOW_WIDTH + this.width * -0.5;
      }
    }
  }, {
    key: 'render',
    value: function render(canvas) {
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'render', this).call(this, canvas, this.x, this.y, this.width, this.height);
    }
  }, {
    key: '_jump',
    value: function _jump(xVelocity) {
      this.xVelocity = xVelocity;
      this.imageIndex = 0;
      if (xVelocity > 0) {
        this.x += INITIAL_JUMP;
        this.image = 'jumping-right';
      } else {
        this.x -= INITIAL_JUMP;
        this.image = 'jumping-left';
      }
    }
  }, {
    key: '_jetpack',
    value: function _jetpack(fuel) {
      this.imageIndex = 0;
      if (fuel <= 1) {
        return fuel;
      }
      if (this.image.indexOf('right') > 0) {
        this.xVelocity += JETPACK_SPEED;
        this._createJetpackSprite(this.x - this.width);
      } else {
        this.xVelocity -= JETPACK_SPEED;
        this._createJetpackSprite(this.x + this.width);
      }
      return fuel - 2;
    }
  }, {
    key: '_createJetpackSprite',
    value: function _createJetpackSprite(x) {
      this.spawns.push(new _jetpack2.Jetpack(x, this.y));
    }
  }]);

  return Player;
}(_sprite.Sprite);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = undefined;

var _sprite = __webpack_require__(0);

var _imageLib = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 3,
    HEIGHT = 3,
    VELOCITY = 2.8;

(0, _imageLib.loadSpriteImages)('star', 1);

var Star = exports.Star = function (_Sprite) {
  _inherits(Star, _Sprite);

  function Star(x) {
    _classCallCheck(this, Star);

    var _this = _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this, x, WIDTH, HEIGHT, { interactive: false, image: 'star' }));

    _this.yVelocity = VELOCITY;
    return _this;
  }

  return Star;
}(_sprite.Sprite);

/***/ })
/******/ ]);