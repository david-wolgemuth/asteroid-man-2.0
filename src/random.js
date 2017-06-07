import { 
  COIN_FREQUENCY, PLATFORM_FREQUENCY, FUEL_FREQUENCY, XLIFE_FREQUENCY, COMET_FREQUENCY,
  MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT, MIN_ASTEROID_R, MAX_ASTEROID_R, MIN_COMET_R, MAX_COMET_R,
  WIDTH, POSITION_SPACE, PLATFORM_W, FUEL_W
} from './constants';

export const randomRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomBool = function(max) {
  return Random.range(0, max) === 0;
};
    // send: {
    //     coin:     function() { return Random.bool(COIN_FREQUENCY); },
    //     platform: function() { return Random.bool(PLATFORM_FREQUENCY); },
    //     asteroid: function() { return Random.bool(Session.game.asteroidFrequency); },
    //     fuel:     function() { return Random.bool(FUEL_FREQUENCY); },
    //     life:     function() { return Random.bool(XLIFE_FREQUENCY); },
    //     comet:    function() { return Random.bool(COMET_FREQUENCY); }
    // },
    // r: {
    //     platform: function() { return Random.range(MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT); },
    //     asteroid: function() { return Random.range(MIN_ASTEROID_R, MAX_ASTEROID_R); },
    //     comet:    function() { return Random.range(MIN_COMET_R, MAX_COMET_R); }
    // },
    // x: {
  
  export const randomPlatformPosition = function () {
    let column = Random.range(1, (Math.floor(WIDTH / POSITION_SPACE - 4))); // I have no idea why -4 works here
    return column * POSITION_SPACE  + ((column - 1) * PLATFORM_W);
  };
        // asteroid: function() { return Random.range(0, WIDTH); },
        // coin:     function() { return Random.range(0, WIDTH); },
        // life:     function() { return Random.range(0, WIDTH); },
        // fuel:     function() { return Random.range(FUEL_W, WIDTH - FUEL_W); },
        // comet:    function() { return Random.range(0, WIDTH);}
    // },
  
    // image: {
        // platform: function () { return Random.range(0, Images.platform.length - 1); }
    // }
// };
