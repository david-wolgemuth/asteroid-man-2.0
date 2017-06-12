
// Screen
export const WINDOW_WIDTH = 345,
    WINDOW_HEIGHT =  500,
    RATIO = WINDOW_WIDTH / WINDOW_HEIGHT;

// Layers

export const BACKGROUND_LAYER = 0,
    TEXT_LAYER = 1,
    PLATFORM_LAYER = 2,
    OBSTACLE_LAYER = 3,
    PLAYER_LAYER = 4,
    FLASH_LAYER = 5;

// Player
export const FALLING_IMAGE_SWITCH = 0.1,
    PLAYER_W = 20,
    PLAYER_H = 40;

// Item Sizes and Ratios
export const MIN_PLATFORM_HEIGHT = 80,
    MAX_PLATFORM_HEIGHT = 320,
    MIN_ASTEROID_R = 10,
    MAX_ASTEROID_R = 25,
    ASTEROID_CUSHION = 0.7,
    ASTEROID_ROTATION_SPEED = 3,
    ASTEROID_MAX_X = 2,
    DEBREE_W = 8,
    DEBREE_ROTATION_SPEED = 7,
    DEBREE_MAX_X = 4,
    EXPLOSION_SPEED = 0.1,
    MIN_COMET_R = 20,
    MAX_COMET_R = 40,
    COMET_IMAGE_SPEED = 0.3,
    POSITION_SPACE = 20,
    PLATFORM_W = 5,
    FUEL_W = 20,
    FUEL_H = 40,
    COIN_R = 25,
    COIN_SPIN = 0.1,
    JETPACK_R = 20;

// Contant Terms
export const HIT_PLAYER = 'hit-player',
    ASTEROID_PASSED = 'asteroid-passed',
    COIN_COLLECTED = 'coin-collected',
    LIFE_COLLECTED = 'life-collected',
    FUEL_COLLECTED = 'fuel-collected';

export const LEFT = false,
    COIN_VALUE = 5,
    FUEL_VALUE = 8,
    RIGHT = true;


// Frequencies
export const FUEL_FREQUENCY = 400,
    XLIFE_FREQUENCY = 800,
    COIN_FREQUENCY = 80,
    PLATFORM_FREQUENCY = 70,
    ASTEROID_FREQUENCY = 20,
    COMET_FREQUENCY = 200;

// Maximum Values
export const MAX_FUEL = 30,
    MAX_LIVES = 5;

// GamePlay
export const INITIAL_JUMP = 5,
    JUMP_RANGE = 16,
    JETPACK_TIME = 0.25,
    JETPACK_SPEED = 0.8,
    JUMP_SPEED = 3,
    DRIFT_SPEED = 0.1,
    GAME_SPEED = 3;
