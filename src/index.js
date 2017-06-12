
import { Game } from './game';

const game = new Game();
// setTimeout(function() {
  game.run();
  setTimeout(function() {
    game.stop();
  }, 12000);
// }, 2000);
