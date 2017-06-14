
import { Game } from './game';
import { CANVAS_ID } from './canvas';

const startNewGame = () => {
  const game = new Game();
  game.spread();
  game.shouldSendObjects = false;
  game.run();
  game.displayMessage('Ready', 1000, () => {
    game.displayMessage('Set', 1000, () => {
      game.shouldSendObjects = true;
      game.displayMessage('Go!', 2000);
    });
  });

  const canvas = document.getElementById(CANVAS_ID);
  const touchstart = (event) => {
    if (game.gameover) {
      canvas.removeEventListener('touchstart', touchstart);
      startNewGame();
    } else {
      game.touch(event);
    }
  };
  canvas.addEventListener('touchstart', touchstart);
};

document.addEventListener('DOMContentLoaded', () => {
  startNewGame(); 
});
